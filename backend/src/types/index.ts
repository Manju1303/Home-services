import { Request } from 'express';

// Extend Express Request type to include authenticated user
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

// JWT Payload
export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

// Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
