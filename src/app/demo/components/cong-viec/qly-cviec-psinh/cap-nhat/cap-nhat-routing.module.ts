import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapNhatComponent } from './cap-nhat.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: CapNhatComponent} 
  ])],
  exports: [RouterModule]
})
export class CapNhatRoutingModule { }
