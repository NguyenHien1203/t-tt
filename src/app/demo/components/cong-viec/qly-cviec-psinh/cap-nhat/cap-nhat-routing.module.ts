import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapNhatComponent } from './cap-nhat.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: CapNhatComponent} 
  ])],
  exports: [RouterModule]
})
export class CapNhatRoutingModule { }
