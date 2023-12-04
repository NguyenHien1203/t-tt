import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LichTinhUyComponent } from './lich-tinh-uy.component';

const routes: Routes = [{path : '', component : LichTinhUyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LichTinhUyRoutingModule { }
