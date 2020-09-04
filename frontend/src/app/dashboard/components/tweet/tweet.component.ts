import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '@Data/Models/Tweet';

@Component({
    selector: 'app-tweet',
    templateUrl: './tweet.component.html',
    styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
    @Input() tweet!: Tweet;
    color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.2)`;

    constructor() {
    }

    ngOnInit(): void {
    }

}
