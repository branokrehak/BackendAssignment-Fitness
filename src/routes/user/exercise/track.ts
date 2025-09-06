import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import userMiddleware from '../../../middleware/user.middleware'

const router = Router()

const {
	CompletedExercise
} = models

export default () => {
	router.post('/:id', userMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const { completedAt, duration } = req.body
			const exerciseId = req.params.id
			const userId = req.user?.id

			const trackedExercise = await CompletedExercise.create({
				userId,
				exerciseId,
				completedAt,
				duration
			})
			
			if (!trackedExercise) {
				return res.status(400).json({ message: 'Exercise not found' })
			}

			return res.json({
				message: 'Exercise tracked successfully'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
