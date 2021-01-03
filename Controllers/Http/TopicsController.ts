import { Controller, Get } from '@Typetron/Router'
import { Topic as TopicModel } from 'App/Models/Topic'
import { Topic } from 'App/Entities/Topic'

@Controller('topics')
export class TopicsController {

    @Get()
    async get() {
        return TopicModel.from(Topic.get())
    }

}
