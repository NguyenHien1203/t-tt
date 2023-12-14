import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TheoDoiTienDoComponent } from './theo-doi-tien-do.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: TheoDoiTienDoComponent} 
  ])],
  exports: [RouterModule]
})
export class TheoDoiTienDoRoutingModule { }
