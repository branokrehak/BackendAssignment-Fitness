import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../db'
import userMiddleware from '../../middleware/user.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/', userMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const profile = await User.findOne({
                attributes: ['name', 'surname', 'nickName', 'age'],
                where: { id: req.user?.id }
            })

            res.set('Cache-Control', 'no-store')
            res.set('Pragma', 'no-cache')
            res.set('Expires', '0')

			return res.json({
				profile
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
