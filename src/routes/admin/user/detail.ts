import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/:id', adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const user = await User.findOne({
				where: { id: req.params.id }
			})

			res.set('Cache-Control', 'no-store')
            res.set('Pragma', 'no-cache')
            res.set('Expires', '0')

			return res.json({
				details: user,
				message: 'User details'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
