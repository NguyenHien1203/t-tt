import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButPheVanBanComponent } from './but-phe-van-ban.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ButPheVanBanComponent} 
  ])],
  exports: [RouterModule]
})
export class ButPheVanBanRoutingModule { }
