import { Component, Input, OnInit } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { UserService } from 'Services'
import { Topic } from '@Data/Models/Topic'
import { FormBuilder } from '@typetron/angular'
import { TopicsForm } from '@Data/Forms/TopicsForm'

@Component({
    selector: 'app-topics-form',
    templateUrl: './topics-form.component.html',
    styleUrls: ['./topics-form.component.scss']
})
export class TopicsFormComponent implements OnInit {

    @Input() user!: number

    topics: Topic[] = []
    form = FormBuilder.build(TopicsForm)

    constructor(
        public modal: NzModalRef,
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
