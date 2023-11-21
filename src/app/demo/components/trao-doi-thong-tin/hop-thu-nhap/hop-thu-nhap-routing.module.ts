import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuNhapComponent } from './hop-thu-nhap.component';

const routes: Routes = [{path: '', component : HopThuNhapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopThuNhapRoutingModule { }
