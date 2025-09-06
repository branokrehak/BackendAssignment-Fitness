import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { models } from '../db'

const {
	User
} = models

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(400).json({ message: 'Auth token is missing' })		
        return
    }

    let decoded: JwtPayload
    try {
        decoded = jwt.verify(authToken, process.env.JWT_SECRET || '') as JwtPayload
    } catch (_) {
        res.status(400).json({ message: 'Invalid or expired token' })
        return 
    }

    const user = await User.findByPk(decoded.id)
    if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
    }

    if (user.role !== 'ADMIN') {
        res.status(403).json({ message: 'Admin access required' })
        return
    }

    req.user = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    next()
}
