import Razorpay from 'razorpay';
import crypto from 'crypto';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// Initialize Razorpay instance
export const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

/**
 * Create Razorpay order
 */
export const createOrder = async (amount: number, bookingId: string) => {
    try {
        const options = {
            amount: Math.round(amount * 100), // Convert to paise
            currency: 'INR',
            receipt: `booking_${bookingId}`,
            notes: {
                bookingId
            }
        };

        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        throw new Error('Failed to create payment order');
    }
};

/**
 * Verify Razorpay payment signature
 */
export const verifyPaymentSignature = (
    orderId: string,
    paymentId: string,
    signature: string
): boolean => {
    try {
        const text = `${orderId}|${paymentId}`;
        const generatedSignature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        return generatedSignature === signature;
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
};
