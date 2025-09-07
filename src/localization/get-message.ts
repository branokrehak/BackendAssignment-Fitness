import { messages, Language } from './messages'

export const getMessage = (key: keyof typeof messages.en, lang: Language) => {
    return messages[lang][key]
}
