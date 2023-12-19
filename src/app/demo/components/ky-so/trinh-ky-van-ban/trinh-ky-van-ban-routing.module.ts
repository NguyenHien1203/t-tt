import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrinhKyVanBanComponent } from './trinh-ky-van-ban.component';

const routes: Routes = [{ path: '', component: TrinhKyVanBanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrinhKyVanBanRoutingModule { }
