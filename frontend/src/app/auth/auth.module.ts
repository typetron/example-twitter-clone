import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { NzButtonModule, NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzButtonModule
    ]
})
export class AuthModule {}
