import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QlyCviecPsinhComponent } from './qly-cviec-psinh.component';



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: QlyCviecPsinhComponent} 
  ])],
  exports: [RouterModule]
})
export class QlyCviecPsinhRoutingModule { }
