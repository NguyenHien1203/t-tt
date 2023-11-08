import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoVanBanComponent } from './so-van-ban.component';

const routes: Routes = [{ path: '', component: SoVanBanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoVanBanRoutingModule { }
