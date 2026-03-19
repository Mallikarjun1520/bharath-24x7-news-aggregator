import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: any;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;
export declare const admin: (req: AuthRequest, res: Response, next: NextFunction) => any;
