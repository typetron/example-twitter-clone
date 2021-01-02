import { Rule } from '@Typetron/Validation'

export class IsUsername extends Rule {
    identifier = 'isUsername'

    passes(attribute: string, value: string): boolean {
        return Boolean(value.match(/^[0-9a-zA-Z_]+$/))
    }

    message(attribute: string): string {
        return `The username can only contain numbers, letters and '_'`
    }
}
