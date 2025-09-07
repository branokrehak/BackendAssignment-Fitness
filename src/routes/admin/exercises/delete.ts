import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.delete('/:id', adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const deletedCount = await Exercise.destroy({
				where: { id: req.params.id },
				force: true
			})
			
			if (deletedCount === 0) {
				return res.status(400).json({ message: 'Exercise not found' })
			}

			return res.json({ message: 'Exercise deleted successfully' })
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
