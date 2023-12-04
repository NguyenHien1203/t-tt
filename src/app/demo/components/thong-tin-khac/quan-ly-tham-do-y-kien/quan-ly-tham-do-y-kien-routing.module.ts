import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyThamDoYKienComponent } from './quan-ly-tham-do-y-kien.component';

const routes: Routes = [{path: '', component: QuanLyThamDoYKienComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyThamDoYKienRoutingModule { }
