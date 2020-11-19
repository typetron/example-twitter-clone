import { Injectable } from '@angular/core'
import { ApiService } from '../../api.service'
import { HttpClient } from '@angular/common/http'
import { Notification } from '../../../../../Models/Notification'

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends ApiService {

    constructor(
        protected http: HttpClient
    ) {super(http)}

    list(): Promise<Notification[]> {
        return this.get('notification')
    }

    read(): Promise<void> {
        return this.post('notification/read')
    }
}
