import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TiepNhanVanBanComponent } from './tiep-nhan-van-ban.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: TiepNhanVanBanComponent} 
  ])],
  exports: [RouterModule]
})
export class TiepNhanVanBanRoutingModule { }
