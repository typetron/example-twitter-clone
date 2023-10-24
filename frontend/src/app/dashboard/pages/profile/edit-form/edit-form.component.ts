import { Component, Input, OnInit } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { User } from '@Data/Models/User'
import { environment } from '../../../../../environments/environment'
import { UserForm } from '@Data/Forms/UserForm'
import { NzUploadFile } from 'ng-zorro-antd/upload'
import { FormBuilder } from '../../../../util'

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

    @Input() user!: User

    imgPath = environment.apiUrl
    form = FormBuilder.build(UserForm)
    files = {
        cover: '',
        photo: '',
    }

    constructor(
        public modal: NzModalRef,
    ) {}

    ngOnInit(): void {
        this.form.patchValue({...this.user, cover: undefined, photo: undefined})
        this.files.cover = this.user.cover ? `${environment.apiUrl}/${this.user.cover}` : ''
        this.files.photo = this.user.photo ? `${environment.apiUrl}/${this.user.photo}` : ''
    }

    beforeUpload(field: 'cover' | 'photo'): (file: NzUploadFile, files: NzUploadFile[]) => boolean {
        return (file: NzUploadFile, files: NzUploadFile[]) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                this.files[field] = event.target?.result as string
                this.form.patchValue({
                    [field]: file
                })
            }
            reader.readAsDataURL(file as unknown as File) // convert to base64 string
            return false
        }
    }
}
