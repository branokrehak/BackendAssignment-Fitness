import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'
import { userAdminValidate } from '../../../middleware/validate.middleware'
import localizationMiddleware from '../../../middleware/localization.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.put('/:id', localizationMiddleware, userAdminValidate, adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		try {
			const { name, surname, nickName, age, role } = req.body

			const [updatedCount] = await User.update({
				name,
				surname,
                nickName,
                age,
                role
			}, { 
				where: { id: req.params.id }
			})

			if (updatedCount === 0) {
				return res.status(400).json({ message: req.translate('userNotFound') })
			}

			return res.json({ message: req.translate('userUpdated') }) 
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: req.translate('internalError') })		
		}
	})

	return router
}
