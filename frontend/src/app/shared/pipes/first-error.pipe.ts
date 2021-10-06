import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {

    // tslint:disable-next-line:no-any
    transform(errors: Record<string, any> | null): string {
        return Object.values(errors ?? {})[0]
    }
}
