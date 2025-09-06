import { Router, Request, Response, NextFunction } from 'express'
import { Op } from 'sequelize'

import { models } from '../db'

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
	router.get('/', async (req: Request<{}, any, any, QueryParams>, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const page = parseInt(req.query.page || '1')
			const limit = parseInt(req.query.limit || '10')
			const offset = (page - 1) * limit

			const where: { programID?: string, name?: { [Op.iLike]: string } } = {}

			if (req.query.programID) {
				where.programID = req.query.programID
			}

			if (req.query.search) {
				// where.name = req.query.search
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
				data: exercises,
				message: 'List of exercises'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
