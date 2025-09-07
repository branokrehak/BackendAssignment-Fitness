import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import userMiddleware from '../../../middleware/user.middleware'
import localizationMiddleware from '../../../middleware/localization.middleware'

const router = Router()

const {
	CompletedExercise
} = models

export default () => {
	router.delete('/:id', localizationMiddleware, userMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const deletedCount = await CompletedExercise.destroy({
				where: { id: req.params.id },
				force: true
			})
			
			if (deletedCount === 0) {
				return res.status(400).json({ message: req.translate('exerciseNotFound') })
			}

			return res.json({ message: req.translate('exerciseRemoved') })
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
