import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { UserService } from '../../../user.service'
import { Topic } from '../../../../../../../Models/Topic'

@Component({
    selector: 'app-topics-form',
    templateUrl: './topics-form.component.html',
    styleUrls: ['./topics-form.component.scss']
})
export class TopicsFormComponent implements OnInit {

    @Input() user!: number

    topics: Topic[] = []

    form = this.fb.group({
        topics: [[]],
    })

    constructor(
        public modal: NzModalRef,
        private fb: FormBuilder,
        private userService: UserService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.topics = await this.userService.allTopics()
        const userTopics = await this.userService.topics()
        this.form.patchValue({
            topics: userTopics.pluck('id')
        })
    }

}
