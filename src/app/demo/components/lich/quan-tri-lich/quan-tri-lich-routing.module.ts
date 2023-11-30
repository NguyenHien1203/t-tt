import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanTriLichComponent } from './quan-tri-lich.component';

const routes: Routes = [{path : '', component : QuanTriLichComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanTriLichRoutingModule { }
