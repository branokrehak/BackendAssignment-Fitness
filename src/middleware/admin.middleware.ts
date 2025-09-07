import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { models } from '../db'

const {
	User
} = models

export default async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(400).json({ message: req.translate('tokenMissing') })		
        return
    }

    let decoded: JwtPayload
    try {
        decoded = jwt.verify(authToken, process.env.JWT_SECRET || '') as JwtPayload
    } catch (_) {
        res.status(400).json({ message: req.translate('invalidToken') })
        return 
    }

    const user = await User.findByPk(decoded.id)
    if (!user) {
        res.status(400).json({ message: req.translate('userNotFound') })
        return
    }

    if (user.role !== 'ADMIN') {
        res.status(400).json({ message: req.translate('adminAccessRequired') })
        return
    }

    req.user = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    next()
}
