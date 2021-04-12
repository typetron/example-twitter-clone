import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Notification } from '@Data/Models/Notification'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends ApiService {

    constructor(http: HttpClient) {
        super(http)
    }

    list(): Promise<Notification[]> {
        return this.get('notifications')
    }

    read(): Promise<void> {
        return this.post('notifications/read')
    }
}
