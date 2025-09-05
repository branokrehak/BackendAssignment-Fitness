import { Router, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import { models } from '../../db'

const router = Router()

const {
	User
} = models

export default () => {
	router.post('/', async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const user = await User.findOne({
				where: {
					email: req.body.email
				}
			})

			const isValid = await bcrypt.compare(req.body.password, user.password);
			if (!isValid) {
				return res.status(400).json({ message: 'Wrong password' })
			}

			return res.json({
				email: user.email,
				nick_name: user.nickName,
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
