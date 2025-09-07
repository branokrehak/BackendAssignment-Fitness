import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(400).json({ message: 'Auth token is missing' })		
        return
    }

    jwt.verify(authToken, process.env.JWT_SECRET || '', (err, user: JwtPayload) => {
        if (err) {
            res.status(400).json({ message: 'Invalid or expired token' })		
            return 
        }
        
        req.user = user
        next()
    })
}
