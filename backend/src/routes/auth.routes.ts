import express, { Request, Response } from 'express';
import Joi from 'joi';
import { prisma } from '../server';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    phone: Joi.string().optional(),
    role: Joi.string().valid('USER', 'PROVIDER').default('USER'),
    // Provider-specific fields
    specialization: Joi.string().when('role', {
        is: 'PROVIDER',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    hourlyRate: Joi.number().when('role', {
        is: 'PROVIDER',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    experience: Joi.number().when('role', {
        is: 'PROVIDER',
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    bio: Joi.string().optional(),
    address: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    pincode: Joi.string().optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

/**
 * POST /api/auth/register
 * Register a new user or service provider
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { email, password, name, phone, role, ...providerData } = value;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                role: role as any
            }
        });

        // If provider, create provider profile
        if (role === 'PROVIDER') {
            await prisma.serviceProvider.create({
                data: {
                    userId: user.id,
                    specialization: providerData.specialization,
                    hourlyRate: providerData.hourlyRate,
                    experience: providerData.experience,
                    bio: providerData.bio,
                    address: providerData.address,
                    city: providerData.city,
                    state: providerData.state,
                    pincode: providerData.pincode,
                    isApproved: false // Requires admin approval
                }
            });
        }

        // Generate tokens
        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.status(201).json({
            message: 'Registration successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { email, password } = value;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { provider: true }
        });

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Verify password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Check if provider is approved
        if (user.role === 'PROVIDER' && user.provider && !user.provider.isApproved) {
            res.status(403).json({
                error: 'Provider account pending approval',
                message: 'Please wait for admin approval before logging in'
            });
            return;
        }

        // Generate tokens
        const payload = { userId: user.id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                provider: user.provider ? {
                    id: user.provider.id,
                    specialization: user.provider.specialization,
                    rating: user.provider.rating
                } : null
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({ error: 'Refresh token required' });
            return;
        }

        // Verify refresh token
        const payload = verifyRefreshToken(refreshToken);

        // Generate new access token
        const newAccessToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: 'Invalid refresh token' });
    }
});

export default router;
