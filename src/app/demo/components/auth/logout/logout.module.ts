import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
@NgModule({
    imports: [
        CommonModule,
        LogoutRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        ToastModule,
        MessageModule,
        MessagesModule
    ],
    declarations: [LogoutComponent]
})
export class LogoutModule { }
