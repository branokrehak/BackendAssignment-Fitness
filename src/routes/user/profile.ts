import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../db'
import userMiddleware from '../../middleware/user.middleware'
import localizationMiddleware from '../../middleware/localization.middleware'

const router = Router()

const {
	User,
	Exercise,
	CompletedExercise
} = models

export default () => {
	router.get('/', localizationMiddleware, userMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const profile = await User.findOne({
                attributes: ['name', 'surname', 'nickName', 'age'],
				include: [
					{
						model: CompletedExercise,
						as: 'completedExercises', 
						attributes: ['completedAt', 'duration'], 
						include: [
							{
								model: Exercise, 
								attributes: ['name'],
							}
						]
					}
				],
                where: { id: req.user?.id }
            })

            res.set('Cache-Control', 'no-store')
            res.set('Pragma', 'no-cache')
            res.set('Expires', '0')

			return res.json({
				message: req.translate('profileDetails'),
				profile
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
