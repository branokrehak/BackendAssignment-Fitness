import { Router, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import { models } from '../db'
import { registerValidate } from '../middleware/validate.middleware'
import localizationMiddleware from '../middleware/localization.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.post('/', registerValidate, localizationMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const { name, surname, nickName, email, age, role, password } = req.body

			const existingUser = await User.findOne({ where: { email } })
			if (existingUser) {
				return res.status(400).json({ message: req.translate('emailTaken') })
			}

			const hashedPassword = await bcrypt.hash(password, 10)

			const newUser = await User.create({
				name,
				surname,
				nickName,
				email,
				age,
				role,
				password: hashedPassword,
			})

			return res.json({
				message: req.translate('userRegistered'),
				id: newUser.id,
				name: newUser.name,
				surname: newUser.surname,
				nickName: newUser.nickName,
				email: newUser.email,
				age: newUser.age,
				role: newUser.role
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
