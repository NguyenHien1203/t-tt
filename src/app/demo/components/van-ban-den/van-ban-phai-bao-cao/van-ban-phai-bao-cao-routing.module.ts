import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VanBanPhaiBaoCaoComponent } from './van-ban-phai-bao-cao.component';



const routes: Routes = [ {path: '', component: VanBanPhaiBaoCaoComponent} ];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanPhaiBaoCaoRoutingModule { }
