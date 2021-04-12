import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {

    transform(errors: Record<string, string>): string {
        return Object.values(errors ?? {})[0]
    }
}
