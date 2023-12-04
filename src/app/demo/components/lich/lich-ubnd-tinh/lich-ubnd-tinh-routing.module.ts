import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LichUbndTinhComponent } from './lich-ubnd-tinh.component';

const routes: Routes = [{path : '', component : LichUbndTinhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LichUbndTinhRoutingModule { }
