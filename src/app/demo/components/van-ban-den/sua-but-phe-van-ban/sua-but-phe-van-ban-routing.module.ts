import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuaButPheVanBanComponent } from './sua-but-phe-van-ban.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: SuaButPheVanBanComponent} 
  ])],
  exports: [RouterModule]
})
export class SuaButPheVanBanRoutingModule { }
