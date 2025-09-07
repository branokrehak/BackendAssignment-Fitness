import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'
import localizationMiddleware from '../../../middleware/localization.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.get('/:id', localizationMiddleware, adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const user = await User.findOne({
				where: { id: req.params.id }
			})

			res.set('Cache-Control', 'no-store')
            res.set('Pragma', 'no-cache')
            res.set('Expires', '0')

			return res.json({
				details: user,
				message: req.translate('profileDetails')
			})
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
