import express, { Response } from 'express';
import Joi from 'joi';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Validation schema
const createReviewSchema = Joi.object({
    bookingId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().optional().allow('')
});

/**
 * POST /api/reviews
 * Submit a review for a completed booking
 */
router.post('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { error, value } = createReviewSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { bookingId, rating, comment } = value;

        // Get booking
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { review: true }
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

        // Check if booking is completed
        if (booking.status !== 'COMPLETED') {
            res.status(400).json({ error: 'Can only review completed bookings' });
            return;
        }

        // Check if review already exists
        if (booking.review) {
            res.status(400).json({ error: 'Review already submitted for this booking' });
            return;
        }

        // Create review
        const review = await prisma.review.create({
            data: {
                bookingId,
                userId: req.user!.userId,
                providerId: booking.providerId,
                rating,
                comment
            }
        });

        // Update provider rating
        const provider = await prisma.serviceProvider.findUnique({
            where: { id: booking.providerId },
            include: { reviews: true }
        });

        if (provider) {
            const totalReviews = provider.reviews.length;
            const averageRating = provider.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

            await prisma.serviceProvider.update({
                where: { id: provider.id },
                data: {
                    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
                    totalReviews
                }
            });
        }

        res.status(201).json({
            message: 'Review submitted successfully',
            review
        });
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

/**
 * GET /api/reviews/provider/:providerId
 * Get all reviews for a provider
 */
router.get('/provider/:providerId', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { providerId } = req.params;

        const reviews = await prisma.review.findMany({
            where: { providerId },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true
                    }
                },
                booking: {
                    select: {
                        service: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ reviews });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

/**
 * GET /api/reviews/booking/:bookingId
 * Get review for a specific booking
 */
router.get('/booking/:bookingId', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { bookingId } = req.params;

        const review = await prisma.review.findUnique({
            where: { bookingId },
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        });

        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return;
        }

        res.json({ review });
    } catch (error) {
        console.error('Get review error:', error);
        res.status(500).json({ error: 'Failed to fetch review' });
    }
});

export default router;
