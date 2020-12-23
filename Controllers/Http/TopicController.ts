import { Controller, Get } from '@Typetron/Router'
import { Topic as TopicModel } from '@Data/Models/Topic'
import { Topic } from 'App/Entities/Topic'

@Controller('topic')
export class TopicController {

    @Get()
    async get() {
        return TopicModel.from(Topic.get())
    }

}
