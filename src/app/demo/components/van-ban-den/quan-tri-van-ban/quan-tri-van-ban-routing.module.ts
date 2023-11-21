import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuanTriVanBanComponent } from './quan-tri-van-ban.component';

const routes: Routes = [{path : '' , component : QuanTriVanBanComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanTriVanBanRoutingModule { }
