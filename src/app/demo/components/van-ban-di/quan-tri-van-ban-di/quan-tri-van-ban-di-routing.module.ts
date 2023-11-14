import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanTriVanBanDiComponent } from './quan-tri-van-ban-di.component';


const routes: Routes = [{path: '', component: QuanTriVanBanDiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanTriVanBanDiRoutingModule { }
