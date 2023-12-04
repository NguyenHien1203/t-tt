import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LichHdndVaDbqhComponent } from './lich-hdnd-va-dbqh.component';

const routes: Routes = [{path : '', component : LichHdndVaDbqhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LichHdndVaDbqhRoutingModule { }
