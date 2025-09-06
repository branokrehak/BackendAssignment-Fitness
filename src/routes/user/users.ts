import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../db'
import userMiddleware from '../../middleware/user.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/', userMiddleware, async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const users = await User.findAll({
                attributes: ['id', 'nickName']
            })

			return res.json({
				list: users,
				message: 'List of users'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
