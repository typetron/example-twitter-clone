import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FirstErrorPipe } from './pipes/first-error.pipe'

@NgModule({
    declarations: [
        FirstErrorPipe
    ],
    exports: [
        FirstErrorPipe
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule {}
