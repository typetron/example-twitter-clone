import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

    tweets: any[] = []

    constructor(
    ) { }

    async ngOnInit(): Promise<void> {
    }

}
