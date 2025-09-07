import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'
import { exerciseAdminValidate } from '../../../middleware/validate.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.post('/', exerciseAdminValidate, adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
            const { difficulty, name, programID } = req.body

			await Exercise.create({
				difficulty,
				name,
                programID
			})

			return res.json({ message: 'Exercise created successfully' })
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
