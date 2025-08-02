import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'


interface UserPayload {
    id: string
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const CurrentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt,'asff') as UserPayload
        req.currentUser = payload
    }catch(err) {
        res.send({currentUser: null})
    }

    next()
}