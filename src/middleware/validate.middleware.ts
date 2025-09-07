import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    nickName: Joi.string().min(2).optional(),
    email: Joi.string().email().required(),       
    age: Joi.number().integer().min(0).optional(),
    role: Joi.string().valid('USER', 'ADMIN').required(),
    password: Joi.string().min(5).required() 
})

export function registerValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = registerSchema.validate(req.body, { abortEarly: false })
    if (error) {
        res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        })
        return
    }
    next()
}

const loginSchema = Joi.object({
    email: Joi.string().email().required(),       
    password: Joi.string().min(5).required() 
})

export function loginValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body, { abortEarly: false })
    if (error) {
        res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        })
        return
    }
    next()
}

const exercisesSchema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),       
    limit: Joi.number().integer().min(10).max(100).optional().default(10),
    programID: Joi.string().optional(),
    search: Joi.string().optional()
})

export function exercisesValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = exercisesSchema.validate(req.query, { abortEarly: false })
    if (error) {
        res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        })
        return
    }
    next()
}

const userAdminSchema = Joi.object({
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
    nickName: Joi.string().min(2).optional(),
    age: Joi.number().integer().min(0).optional(),
    role: Joi.string().valid('USER', 'ADMIN').required(),
})

export function userAdminValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = userAdminSchema.validate(req.body, { abortEarly: false })
    if (error) {
        res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        })
        return
    }
    next()
}

const exerciseAdminSchema = Joi.object({
    name: Joi.string().min(2).required(),
    programID: Joi.string().min(1).required(),
    difficulty: Joi.string().valid('EASY', 'MEDIUM', 'HARD').required(),
})

export function exerciseAdminValidate(req: Request, res: Response, next: NextFunction) {
    const { error } = exerciseAdminSchema.validate(req.body, { abortEarly: false })
    if (error) {
        res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
        })
        return
    }
    next()
}
