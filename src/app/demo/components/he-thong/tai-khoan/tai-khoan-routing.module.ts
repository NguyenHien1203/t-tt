import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaiKhoanComponent } from './tai-khoan.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
      {path: '', component: TaiKhoanComponent} 
    ])],
    exports: [RouterModule]
})
export class TaiKhoanRoutingModule { }
