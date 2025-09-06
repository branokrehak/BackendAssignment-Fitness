import { Router, Request, Response, NextFunction } from 'express'

import { models } from '../../../db'
import adminMiddleware from '../../../middleware/admin.middleware'

const router = Router()

const {
	User
} = models

export default () => {
	router.put('/:id', adminMiddleware, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
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
				return res.status(400).json({ message: 'User not found' })
			}

			return res.json({
				message: 'User updated successfully'
			})
		} catch (error) {
			console.error(error)
			return res.status(400).json({ message: 'Internal server error' })		
		}
	})

	return router
}
