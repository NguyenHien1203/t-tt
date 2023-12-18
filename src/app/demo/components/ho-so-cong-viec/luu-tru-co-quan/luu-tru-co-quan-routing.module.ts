import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuuTruCoQuanComponent } from './luu-tru-co-quan.component';

const routes: Routes = [{path : '', component : LuuTruCoQuanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuuTruCoQuanRoutingModule { }
