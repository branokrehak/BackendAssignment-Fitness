import { Language, messages } from '../localization/messages'

declare global {
    namespace Express {
        interface Request {
            translate: (key: keyof typeof messages.en) => string
            language?: Language
        }
    }

    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
