import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'
import localizationMiddleware from '../../../middleware/localization.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.delete('/:id', adminMiddleware, localizationMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const deletedCount = await Exercise.destroy({
				where: { id: req.params.id },
				force: true
			})
			
			if (deletedCount === 0) {
				return res.status(400).json({ message: req.translate('exerciseNotFound') })
			}

			return res.json({ message: req.translate('exerciseRemoved') })
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
