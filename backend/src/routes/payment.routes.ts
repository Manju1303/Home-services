import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken } from '../middleware/auth.middleware';
import { createOrder, verifyPaymentSignature } from '../services/razorpay.service';

const router = express.Router();

/**
 * POST /api/payments/create-order
 * Create Razorpay order for a booking
 */
router.post('/create-order', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            res.status(400).json({ error: 'Booking ID is required' });
            return;
        }

        // Get booking
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }

        // Check authorization
        if (booking.userId !== req.user!.userId) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        // Check if payment already exists
        const existingPayment = await prisma.payment.findUnique({
            where: { bookingId }
        });

        if (existingPayment && existingPayment.status === 'COMPLETED') {
            res.status(400).json({ error: 'Payment already completed for this booking' });
            return;
        }

        // Create Razorpay order
        const order = await createOrder(booking.totalPrice, bookingId);

        // Save payment record
        const payment = await prisma.payment.upsert({
            where: { bookingId },
            update: {
                razorpayOrderId: order.id,
                amount: booking.totalPrice,
                status: 'PENDING'
            },
            create: {
                bookingId,
                razorpayOrderId: order.id,
                amount: booking.totalPrice,
                status: 'PENDING'
            }
        });

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
            payment
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

/**
 * POST /api/payments/verify
 * Verify Razorpay payment
 */
router.post('/verify', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
            res.status(400).json({ error: 'Missing payment verification data' });
            return;
        }

        // Verify signature
        const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (!isValid) {
            res.status(400).json({ error: 'Invalid payment signature' });
            return;
        }

        // Update payment status
        const payment = await prisma.payment.update({
            where: { bookingId },
            data: {
                razorpayPaymentId,
                razorpaySignature,
                status: 'COMPLETED'
            }
        });

        // Update booking payment status and confirm booking
        await prisma.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: 'COMPLETED',
                status: 'CONFIRMED'
            }
        });

        res.json({
            message: 'Payment verified successfully',
            payment
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
});

/**
 * POST /api/payments/webhook
 * Razorpay webhook handler
 */
router.post('/webhook', async (req: Request, res: Response): Promise<void> => {
    try {
        const { event, payload } = req.body;

        console.log('Razorpay webhook event:', event);

        // Handle different events
        switch (event) {
            case 'payment.captured':
                // Payment was captured successfully
                const paymentEntity = payload.payment.entity;
                console.log('Payment captured:', paymentEntity.id);
                break;

            case 'payment.failed':
                // Payment failed
                const failedPayment = payload.payment.entity;
                console.log('Payment failed:', failedPayment.id);

                // Update payment status
                await prisma.payment.updateMany({
                    where: { razorpayOrderId: failedPayment.order_id },
                    data: { status: 'FAILED' }
                });
                break;

            default:
                console.log('Unhandled webhook event:', event);
        }

        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
