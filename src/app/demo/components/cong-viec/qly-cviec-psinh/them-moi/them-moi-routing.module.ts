import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemMoiComponent } from './them-moi.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ThemMoiComponent} 
  ])],
  exports: [RouterModule]
})
export class ThemMoiRoutingModule { }
