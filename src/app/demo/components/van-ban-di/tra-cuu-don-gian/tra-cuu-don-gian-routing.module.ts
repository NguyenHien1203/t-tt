import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraCuuDonGianComponent } from './tra-cuu-don-gian.component';

const routes: Routes = [{path : '', component : TraCuuDonGianComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraCuuDonGianRoutingModule { }
