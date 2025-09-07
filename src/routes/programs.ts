import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import { models } from '../db'
import localizationMiddleware from '../middleware/localization.middleware'

const router = Router()

const {
	Program
} = models

export default () => {
	router.get('/', localizationMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const programs = await Program.findAll()
			
			return res.json({
				message: req.translate('programList'),
				data: programs
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
