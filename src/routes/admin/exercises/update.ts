import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.put('/:id', adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
            const { difficulty, name, programID } = req.body

			const [updatedCount] = await Exercise.update({
				difficulty,
				name,
                programID
			}, { 
				where: { id: req.params.id }
			})

			if (updatedCount === 0) {
				return res.status(400).json({ message: 'Exercise not found' })
			}

			return res.json({
				message: 'Exercise updated successfully'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
