import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { EditFormComponent } from './edit-form/edit-form.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(
        private modal: NzModalService
    ) { }

    ngOnInit(): void {
    }

    showEditModal(): void {
        this.modal.create({
            nzTitle: 'Edit profile',
            nzContent: EditFormComponent
        });
    }
}
