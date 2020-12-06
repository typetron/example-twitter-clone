import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Notification } from '../../../../../Models/Notification'
import { ApiService } from '../../services/api.service'

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
