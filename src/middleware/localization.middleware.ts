import { Request, Response, NextFunction } from 'express'
import { Language, messages } from '../localization/messages'
import { getMessage } from '../localization/get-message'

export default (req: Request, _res: Response, next: NextFunction) => {
    const lang = (req.headers.language as Language) || 'en'

    req.translate = (key: keyof typeof messages.en) => getMessage(key, lang)

    next()
}
