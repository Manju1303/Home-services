import express, { Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * GET /api/users/profile
 * Get current user profile
 */
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatar: true,
                createdAt: true,
                provider: {
                    select: {
                        id: true,
                        specialization: true,
                        hourlyRate: true,
                        experience: true,
                        bio: true,
                        rating: true,
                        totalReviews: true,
                        isApproved: true,
                        isAvailable: true,
                        address: true,
                        city: true,
                        state: true,
                        pincode: true
                    }
                }
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

/**
 * PUT /api/users/profile
 * Update user profile
 */
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, phone, avatar } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: req.user!.userId },
            data: {
                ...(name && { name }),
                ...(phone && { phone }),
                ...(avatar && { avatar })
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                avatar: true
            }
        });

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

/**
 * GET /api/users/bookings
 * Get user's booking history
 */
router.get('/bookings', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: req.user!.userId },
            include: {
                service: true,
                provider: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                phone: true,
                                email: true
                            }
                        }
                    }
                },
                payment: true,
                review: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ bookings });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

export default router;
