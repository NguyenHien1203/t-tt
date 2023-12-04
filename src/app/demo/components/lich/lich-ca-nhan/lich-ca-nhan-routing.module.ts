import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LichCaNhanComponent } from './lich-ca-nhan.component';

const routes: Routes = [{path : '', component : LichCaNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LichCaNhanRoutingModule { }
