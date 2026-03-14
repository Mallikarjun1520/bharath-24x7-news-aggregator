import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export interface AuthRequest extends Request {
    user?: any; // To hold the user document
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key') as any;

        // Find user by id from token
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
