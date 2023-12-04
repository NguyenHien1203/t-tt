import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuaCongViecComponent } from './sua-cong-viec.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: SuaCongViecComponent} 
  ])],
  exports: [RouterModule]
})
export class SuaCongViecRoutingModule { }
