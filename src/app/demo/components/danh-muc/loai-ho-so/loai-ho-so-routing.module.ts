import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaiHoSoComponent } from './loai-ho-so.component';

const routes: Routes = [{path: '', component: LoaiHoSoComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaiHoSoRoutingModule { }
