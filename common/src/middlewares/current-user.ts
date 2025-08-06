import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the payload that will be extracted from the JWT
interface UserPayload {
  id: string;
  email: string;
}

// Extend Express Request to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If no JWT exists in session, continue without setting currentUser
  if (!req.session?.jwt) {
    return next();
  }

  try {
    // Make sure JWT_KEY is defined in the environment
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined in environment variables');
    }

    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    console.error('JWT verification failed:', err);
  }

  next();
};
