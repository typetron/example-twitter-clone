import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { NzModalRef } from 'ng-zorro-antd/modal'
import { User } from '@Data/Models/User'
import { environment } from '../../../../../environments/environment'

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

    @Input() user!: User

    imgPath = environment.apiUrl

    form = this.fb.group({
        cover: undefined,
        photo: undefined,
        name: undefined,
        bio: undefined,
    })

    files = {
        cover: '',
        photo: '',
    }

    constructor(
        public modal: NzModalRef,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form.patchValue({...this.user, cover: undefined, photo: undefined})
        this.files.cover = this.user.cover ? `${environment.apiUrl}/${this.user.cover}` : ''
        this.files.photo = this.user.photo ? `${environment.apiUrl}/${this.user.photo}` : ''
    }

    beforeUpload(field: 'cover' | 'photo'): (file: File) => boolean {
        return (file: File) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                this.files[field] = event.target.result as string
                this.form.patchValue({
                    [field]: file
                })
            }
            reader.readAsDataURL(file) // convert to base64 string
            return false
        }
    }

}
