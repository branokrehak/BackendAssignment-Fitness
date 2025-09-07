import { Router, Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'

import { models } from '../db'
import localizationMiddleware from '../middleware/localization.middleware'

const router = Router()

const {
	Exercise,
	Program
} = models

type QueryParams = {
    page?: string
    limit?: string
    programID?: string
    search?: string
}

export default () => {
	router.get('/', localizationMiddleware, async (req: Request<{}, any, any, QueryParams>, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const page = req.query.page as any as number
			const limit = req.query.limit as any as number
			const offset = (page - 1) * limit
			const where: { programID?: string, name?: { [Op.iLike]: string } } = {}

			if (req.query.programID) {
				where.programID = req.query.programID
			}

			if (req.query.search) {
				where.name = { [Op.iLike]: `%${req.query.search}%` }
			}
			
			const exercises = await Exercise.findAll({
				include: [{
					model: Program
				}],
				limit,
				offset,
				where
			})
	
			return res.json({
				message: req.translate('exerciseList'),
				data: exercises
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
