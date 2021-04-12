import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    scroll$ = new Subject<Event>()

}
