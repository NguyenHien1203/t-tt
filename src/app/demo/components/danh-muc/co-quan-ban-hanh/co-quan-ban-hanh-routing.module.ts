import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoQuanBanHanhComponent } from './co-quan-ban-hanh.component';


const routes: Routes = [ {path: '', component: CoQuanBanHanhComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoQuanBanHanhRoutingModule { }
