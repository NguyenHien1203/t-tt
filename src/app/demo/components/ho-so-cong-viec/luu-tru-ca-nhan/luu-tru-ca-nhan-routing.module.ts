import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuuTruCaNhanComponent } from './luu-tru-ca-nhan.component';

const routes: Routes = [{path : '', component : LuuTruCaNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuuTruCaNhanRoutingModule { }
