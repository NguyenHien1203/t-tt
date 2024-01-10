import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanBanDenLienQuanComponent } from './van-ban-den-lien-quan.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [ {path: '', component: VanBanDenLienQuanComponent} ];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDenLienQuanRoutingModule { }
