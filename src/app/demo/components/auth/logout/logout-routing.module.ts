import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: LogoutComponent }
])],
exports: [RouterModule]
})
export class LogoutRoutingModule { }
