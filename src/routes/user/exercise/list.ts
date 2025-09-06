import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import userMiddleware from '../../../middleware/user.middleware'

const router = Router()

const {
	Exercise
} = models

export default () => {
	router.post('/', userMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
            
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
