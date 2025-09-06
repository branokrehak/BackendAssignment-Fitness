import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/', adminMiddleware, async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const users = await User.findAll()

			res.set('Cache-Control', 'no-store')
            res.set('Pragma', 'no-cache')
            res.set('Expires', '0')

			return res.json({
				list: users
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
