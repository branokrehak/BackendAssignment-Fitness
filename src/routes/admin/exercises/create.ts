import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'
import { exerciseAdminValidate } from '../../../middleware/validate.middleware'
import localizationMiddleware from '../../../middleware/localization.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.post('/', localizationMiddleware, exerciseAdminValidate, adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
            const { difficulty, name, programID } = req.body

			await Exercise.create({
				difficulty,
				name,
                programID
			})

			return res.json({ message: req.translate('exerciseCreated') })
		} catch (error) {
			console.error(error)
			return res.status(500).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
