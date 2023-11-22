import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemMoiCongViecComponent } from './them-moi-cong-viec.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ThemMoiCongViecComponent} 
  ])],
  exports: [RouterModule]
})
export class ThemMoiCongViecRoutingModule { }
