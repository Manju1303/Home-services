import express, { Request, Response } from 'express';
import Joi from 'joi';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Validation schema
const createBookingSchema = Joi.object({
    serviceId: Joi.string().required(),
    providerId: Joi.string().required(),
    bookingDate: Joi.date().required(),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    hours: Joi.number().min(1).max(12).required(),
    address: Joi.string().required(),
    notes: Joi.string().optional().allow('')
});

/**
 * POST /api/bookings
 * Create a new booking
 */
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { error, value } = createBookingSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { serviceId, providerId, bookingDate, startTime, hours, address, notes } = value;

        // Get service and provider details
        const service = await prisma.service.findUnique({ where: { id: serviceId } });
        const provider = await prisma.serviceProvider.findUnique({ where: { id: providerId } });

        if (!service || !provider) {
            res.status(404).json({ error: 'Service or provider not found' });
            return;
        }

        if (!provider.isApproved || !provider.isAvailable) {
            res.status(400).json({ error: 'Provider is not available' });
            return;
        }

        // Calculate total price
        const totalPrice = provider.hourlyRate * hours;

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: req.user!.userId,
                providerId,
                serviceId,
                bookingDate: new Date(bookingDate),
                startTime,
                hours,
                totalPrice,
                address,
                notes,
                status: 'PENDING',
                paymentStatus: 'PENDING'
            },
            include: {
                service: true,
                provider: {
                    include: {
                        user: {
                            select: { name: true, phone: true, email: true }
                        }
                    }
                }
            }
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

/**
 * GET /api/bookings/:id
 * Get booking details
 */
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: {
                service: true,
                provider: {
                    include: {
                        user: {
                            select: { name: true, phone: true, email: true }
                        }
                    }
                },
                user: {
                    select: { name: true, phone: true, email: true }
                },
                payment: true,
                review: true
            }
        });

        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }

        // Check authorization
        if (
            booking.userId !== req.user!.userId &&
            booking.provider.userId !== req.user!.userId &&
            req.user!.role !== 'ADMIN'
        ) {
            res.status(403).json({ error: 'Unauthorized access' });
            return;
        }

        res.json({ booking });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
});

/**
 * GET /api/bookings
 * List all bookings (filtered by role)
 */
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status } = req.query;
        const userId = req.user!.userId;
        const userRole = req.user!.role;

        let whereClause: any = {};

        // Filter based on role
        if (userRole === 'USER') {
            whereClause.userId = userId;
        } else if (userRole === 'PROVIDER') {
            const provider = await prisma.serviceProvider.findUnique({
                where: { userId }
            });
            if (provider) {
                whereClause.providerId = provider.id;
            }
        }
        // ADMIN can see all bookings (no filter)

        if (status) {
            whereClause.status = status;
        }

        const bookings = await prisma.booking.findMany({
            where: whereClause,
            include: {
                service: true,
                provider: {
                    include: {
                        user: {
                            select: { name: true, phone: true }
                        }
                    }
                },
                user: {
                    select: { name: true, phone: true, email: true }
                },
                payment: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ bookings });
    } catch (error) {
        console.error('List bookings error:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

/**
 * PUT /api/bookings/:id/cancel
 * Cancel a booking
 */
router.put('/:id/cancel', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const booking = await prisma.booking.findUnique({
            where: { id }
        });

        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }

        // Check authorization
        if (booking.userId !== req.user!.userId && req.user!.role !== 'ADMIN') {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        // Check if already cancelled or completed
        if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
            res.status(400).json({ error: `Cannot cancel ${booking.status.toLowerCase()} booking` });
            return;
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });

        res.json({ message: 'Booking cancelled successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
});

/**
 * PUT /api/bookings/:id/status
 * Update booking status (Provider/Admin only)
 */
router.put('/:id/status', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { provider: true }
        });

        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }

        // Check authorization (provider or admin)
        if (booking.provider.userId !== req.user!.userId && req.user!.role !== 'ADMIN') {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status }
        });

        res.json({ message: 'Booking status updated', booking: updatedBooking });
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({ error: 'Failed to update booking status' });
    }
});

export default router;
