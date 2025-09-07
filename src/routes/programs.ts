import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import { models } from '../db'

const router = Router()

const {
	Program
} = models

export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const programs = await Program.findAll()
			
			return res.json({
				message: 'List of programs',
				data: programs
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
