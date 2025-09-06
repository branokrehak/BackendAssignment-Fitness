import { Router, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import { models } from '../db'

const router = Router()

const {
	User
} = models

export default () => {
	router.post('/', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const { name, surname, nickName, email, age, role, password } = req.body

			if (!email || !password || !role) {
				return res.status(400).json({ message: 'Email, password, and role are required' })
			}

			const existingUser = await User.findOne({ where: { email } })
			if (existingUser) {
				return res.status(400).json({ message: 'User with this email already exists' })
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
				id: newUser.id,
				name: newUser.name,
				surname: newUser.surname,
				nickName: newUser.nickName,
				email: newUser.email,
				age: newUser.age,
				role: newUser.role,
				message: 'User registered successfully',
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
