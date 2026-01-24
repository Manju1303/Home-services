import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * GET /api/providers
 * List all approved providers with optional filters
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { specialization, city, minRating } = req.query;

        const providers = await prisma.serviceProvider.findMany({
            where: {
                isApproved: true,
                isAvailable: true,
                ...(specialization && {
                    specialization: {
                        contains: specialization as string,
                        mode: 'insensitive'
                    }
                }),
                ...(city && { city: { equals: city as string, mode: 'insensitive' } }),
                ...(minRating && { rating: { gte: parseFloat(minRating as string) } })
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                        avatar: true
                    }
                },
                availability: {
                    where: { isActive: true }
                }
            },
            orderBy: { rating: 'desc' }
        });

        res.json({ providers });
    } catch (error) {
        console.error('List providers error:', error);
        res.status(500).json({ error: 'Failed to fetch providers' });
    }
});

/**
 * GET /api/providers/:id
 * Get provider details with reviews
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const provider = await prisma.serviceProvider.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                        avatar: true
                    }
                },
                availability: {
                    where: { isActive: true }
                },
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatar: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!provider) {
            res.status(404).json({ error: 'Provider not found' });
            return;
        }

        res.json({ provider });
    } catch (error) {
        console.error('Get provider error:', error);
        res.status(500).json({ error: 'Failed to fetch provider details' });
    }
});

/**
 * PUT /api/providers/availability
 * Update provider availability (Provider only)
 */
router.put(
    '/availability',
    authenticateToken,
    requireRole('PROVIDER'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { availabilitySlots } = req.body;

            // Get provider ID
            const provider = await prisma.serviceProvider.findUnique({
                where: { userId: req.user!.userId }
            });

            if (!provider) {
                res.status(404).json({ error: 'Provider profile not found' });
                return;
            }

            // Delete existing availability
            await prisma.availability.deleteMany({
                where: { providerId: provider.id }
            });

            // Create new availability slots
            if (availabilitySlots && Array.isArray(availabilitySlots)) {
                await prisma.availability.createMany({
                    data: availabilitySlots.map((slot: any) => ({
                        providerId: provider.id,
                        dayOfWeek: slot.dayOfWeek,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        isActive: true
                    }))
                });
            }

            const updatedAvailability = await prisma.availability.findMany({
                where: { providerId: provider.id }
            });

            res.json({
                message: 'Availability updated successfully',
                availability: updatedAvailability
            });
        } catch (error) {
            console.error('Update availability error:', error);
            res.status(500).json({ error: 'Failed to update availability' });
        }
    }
);

/**
 * GET /api/providers/dashboard
 * Get provider dashboard data (Provider only)
 */
router.get(
    '/dashboard/stats',
    authenticateToken,
    requireRole('PROVIDER'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const provider = await prisma.serviceProvider.findUnique({
                where: { userId: req.user!.userId }
            });

            if (!provider) {
                res.status(404).json({ error: 'Provider profile not found' });
                return;
            }

            // Get statistics
            const totalBookings = await prisma.booking.count({
                where: { providerId: provider.id }
            });

            const completedBookings = await prisma.booking.count({
                where: {
                    providerId: provider.id,
                    status: 'COMPLETED'
                }
            });

            const totalEarnings = await prisma.booking.aggregate({
                where: {
                    providerId: provider.id,
                    status: 'COMPLETED',
                    paymentStatus: 'COMPLETED'
                },
                _sum: {
                    totalPrice: true
                }
            });

            const recentBookings = await prisma.booking.findMany({
                where: { providerId: provider.id },
                include: {
                    service: true,
                    user: {
                        select: {
                            name: true,
                            phone: true,
                            email: true
                        }
                    },
                    payment: true
                },
                orderBy: { createdAt: 'desc' },
                take: 10
            });

            res.json({
                stats: {
                    totalBookings,
                    completedBookings,
                    totalEarnings: totalEarnings._sum.totalPrice || 0,
                    rating: provider.rating,
                    totalReviews: provider.totalReviews
                },
                recentBookings
            });
        } catch (error) {
            console.error('Get dashboard error:', error);
            res.status(500).json({ error: 'Failed to fetch dashboard data' });
        }
    }
);

/**
 * PUT /api/providers/profile
 * Update provider profile (Provider only)
 */
router.put(
    '/profile',
    authenticateToken,
    requireRole('PROVIDER'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { specialization, hourlyRate, experience, bio, address, city, state, pincode, isAvailable } = req.body;

            const provider = await prisma.serviceProvider.findUnique({
                where: { userId: req.user!.userId }
            });

            if (!provider) {
                res.status(404).json({ error: 'Provider profile not found' });
                return;
            }

            const updatedProvider = await prisma.serviceProvider.update({
                where: { id: provider.id },
                data: {
                    ...(specialization && { specialization }),
                    ...(hourlyRate && { hourlyRate }),
                    ...(experience && { experience }),
                    ...(bio && { bio }),
                    ...(address && { address }),
                    ...(city && { city }),
                    ...(state && { state }),
                    ...(pincode && { pincode }),
                    ...(isAvailable !== undefined && { isAvailable })
                }
            });

            res.json({
                message: 'Provider profile updated successfully',
                provider: updatedProvider
            });
        } catch (error) {
            console.error('Update provider profile error:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    }
);

export default router;
