import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../db'
import userMiddleware from '../../middleware/user.middleware'
import localizationMiddleware from '../../middleware/localization.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/', userMiddleware, localizationMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const users = await User.findAll({
                attributes: ['id', 'nickName']
            })

			return res.json({
				message: req.translate('userList'),
				list: users
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
