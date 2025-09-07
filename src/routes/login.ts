import { Router, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { models } from '../db'
import { loginValidate } from '../middleware/validate.middleware'
import localizationMiddleware from '../middleware/localization.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.post('/', localizationMiddleware, loginValidate, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const user = await User.findOne({ where: { email: req.body.email } })
			if (!user) {
				return res.status(400).json({ message: req.translate('userNotFound') })
			}

			const isValid = await bcrypt.compare(req.body.password, user.password)
			if (!isValid) {
				return res.status(400).json({ message: req.translate('wrongPassword') })
			}

			const token = jwt.sign(
				{ id: user.id, role: user.role },   
				process.env.JWT_SECRET || '',                         
				{ expiresIn: '999h' }                 
			)

			return res.json({
				message: req.translate('userLoggedIn'),
				token
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
