import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction): void => {
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(400).json({ message: 'Auth token is missing' })		
        return
    }

    jwt.verify(authToken, process.env.JWT_SECRET || '', (err, user: JwtPayload) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid or expired token' })		
        }

        if (user.role !== 'ADMIN') {
            return res.status(400).json({ message: 'Admin access required' })		
        }

        req.user = user
        next()
    })
}
