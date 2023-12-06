import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XuLyCongViecComponent } from './xu-ly-cong-viec.component';

const routes: Routes = [{path : '', component : XuLyCongViecComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XuLyCongViecRoutingModule { }
