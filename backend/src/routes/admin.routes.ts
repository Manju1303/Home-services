import express, { Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require ADMIN role
router.use(authenticateToken);
router.use(requireRole('ADMIN'));

/**
 * GET /api/admin/providers/pending
 * Get all pending provider approvals
 */
router.get('/providers/pending', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const pendingProviders = await prisma.serviceProvider.findMany({
            where: { isApproved: false },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ providers: pendingProviders });
    } catch (error) {
        console.error('Get pending providers error:', error);
        res.status(500).json({ error: 'Failed to fetch pending providers' });
    }
});

/**
 * PUT /api/admin/providers/:id/approve
 * Approve a provider
 */
router.put('/providers/:id/approve', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        const provider = await prisma.serviceProvider.update({
            where: { id },
            data: { isApproved: isApproved !== false } // Default to true if not specified
        });

        res.json({
            message: `Provider ${isApproved !== false ? 'approved' : 'rejected'} successfully`,
            provider
        });
    } catch (error) {
        console.error('Approve provider error:', error);
        res.status(500).json({ error: 'Failed to approve provider' });
    }
});

/**
 * GET /api/admin/analytics
 * Get platform analytics
 */
router.get('/analytics', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Total users
        const totalUsers = await prisma.user.count({
            where: { role: 'USER' }
        });

        // Total providers
        const totalProviders = await prisma.serviceProvider.count();
        const approvedProviders = await prisma.serviceProvider.count({
            where: { isApproved: true }
        });

        // Total bookings
        const totalBookings = await prisma.booking.count();
        const completedBookings = await prisma.booking.count({
            where: { status: 'COMPLETED' }
        });

        // Revenue
        const totalRevenue = await prisma.payment.aggregate({
            where: { status: 'COMPLETED' },
            _sum: { amount: true }
        });

        // Recent bookings
        const recentBookings = await prisma.booking.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { name: true, email: true }
                },
                provider: {
                    include: {
                        user: {
                            select: { name: true }
                        }
                    }
                },
                service: true,
                payment: true
            }
        });

        // Bookings by status
        const bookingsByStatus = await prisma.booking.groupBy({
            by: ['status'],
            _count: true
        });

        // Most popular services
        const popularServices = await prisma.booking.groupBy({
            by: ['serviceId'],
            _count: true,
            orderBy: {
                _count: {
                    serviceId: 'desc'
                }
            },
            take: 5
        });

        const servicesWithNames = await Promise.all(
            popularServices.map(async (item) => {
                const service = await prisma.service.findUnique({
                    where: { id: item.serviceId }
                });
                return {
                    serviceName: service?.name || 'Unknown',
                    bookings: item._count
                };
            })
        );

        res.json({
            summary: {
                totalUsers,
                totalProviders,
                approvedProviders,
                pendingProviders: totalProviders - approvedProviders,
                totalBookings,
                completedBookings,
                totalRevenue: totalRevenue._sum.amount || 0
            },
            recentBookings,
            bookingsByStatus,
            popularServices: servicesWithNames
        });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

/**
 * GET /api/admin/users
 * Get all users with pagination
 */
router.get('/users', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { page = '1', limit = '20', role } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const users = await prisma.user.findMany({
            where: role ? { role: role as any } : undefined,
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
                provider: {
                    select: {
                        id: true,
                        specialization: true,
                        isApproved: true,
                        rating: true
                    }
                }
            },
            skip,
            take: parseInt(limit as string),
            orderBy: { createdAt: 'desc' }
        });

        const totalUsers = await prisma.user.count({
            where: role ? { role: role as any } : undefined
        });

        res.json({
            users,
            pagination: {
                total: totalUsers,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                pages: Math.ceil(totalUsers / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

/**
 * GET /api/admin/bookings
 * Get all bookings with filters
 */
router.get('/bookings', async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { status, page = '1', limit = '20' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const bookings = await prisma.booking.findMany({
            where: status ? { status: status as any } : undefined,
            include: {
                user: {
                    select: { name: true, email: true, phone: true }
                },
                provider: {
                    include: {
                        user: {
                            select: { name: true, phone: true }
                        }
                    }
                },
                service: true,
                payment: true
            },
            skip,
            take: parseInt(limit as string),
            orderBy: { createdAt: 'desc' }
        });

        const totalBookings = await prisma.booking.count({
            where: status ? { status: status as any } : undefined
        });

        res.json({
            bookings,
            pagination: {
                total: totalBookings,
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                pages: Math.ceil(totalBookings / parseInt(limit as string))
            }
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

export default router;
