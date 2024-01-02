import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoiMatKhauComponent } from './doi-mat-khau.component';

const routes: Routes = [{path :'', component : DoiMatKhauComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoiMatKhauRoutingModule { }
