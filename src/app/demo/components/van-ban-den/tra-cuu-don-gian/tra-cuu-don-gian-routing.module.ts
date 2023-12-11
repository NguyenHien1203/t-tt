import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TraCuuDonGianComponent } from './tra-cuu-don-gian.component';

const routes: Routes = [ {path: '', component: TraCuuDonGianComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraCuuDonGianRoutingModule { }
