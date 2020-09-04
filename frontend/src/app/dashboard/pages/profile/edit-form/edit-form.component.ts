import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef, NzUploadFile } from 'ng-zorro-antd';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

    @Input() user!: object;

    form = this.fb.group({
        cover: undefined,
        photo: [[]],
        name: [undefined],
        bio: undefined,
    });

    constructor(
        public modal: NzModalRef,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
    }

    beforeUpload = (file: NzUploadFile): boolean => {
        // this.fileList = this.fileList.concat(file);
        return false;
    };

}
