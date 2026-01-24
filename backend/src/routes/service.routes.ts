import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { AuthRequest } from '../types';
import { authenticateToken, requireRole } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * GET /api/services
 * Get all active services with optional filtering
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.query;

        const services = await prisma.service.findMany({
            where: {
                isActive: true,
                ...(category && { category: category as any })
            },
            orderBy: { name: 'asc' }
        });

        res.json({ services });
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

/**
 * GET /api/services/:id
 * Get service details
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const service = await prisma.service.findUnique({
            where: { id }
        });

        if (!service) {
            res.status(404).json({ error: 'Service not found' });
            return;
        }

        res.json({ service });
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

/**
 * POST /api/services
 * Create a new service (Admin only)
 */
router.post(
    '/',
    authenticateToken,
    requireRole('ADMIN'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { name, description, category, basePrice, imageUrl } = req.body;

            const service = await prisma.service.create({
                data: {
                    name,
                    description,
                    category,
                    basePrice,
                    imageUrl
                }
            });

            res.status(201).json({ message: 'Service created successfully', service });
        } catch (error) {
            console.error('Create service error:', error);
            res.status(500).json({ error: 'Failed to create service' });
        }
    }
);

/**
 * PUT /api/services/:id
 * Update service (Admin only)
 */
router.put(
    '/:id',
    authenticateToken,
    requireRole('ADMIN'),
    async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { name, description, basePrice, imageUrl, isActive } = req.body;

            const service = await prisma.service.update({
                where: { id },
                data: {
                    ...(name && { name }),
                    ...(description && { description }),
                    ...(basePrice && { basePrice }),
                    ...(imageUrl && { imageUrl }),
                    ...(isActive !== undefined && { isActive })
                }
            });

            res.json({ message: 'Service updated successfully', service });
        } catch (error) {
            console.error('Update service error:', error);
            res.status(500).json({ error: 'Failed to update service' });
        }
    }
);

export default router;
