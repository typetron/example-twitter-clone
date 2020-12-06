import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    update$ = new Subject()

    constructor() {}

    async ngOnInit(): Promise<void> {

    }

}
