import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuyetVanBanTrinhKyComponent } from './duyet-van-ban-trinh-ky.component';

const routes: Routes = [{path: '', component:DuyetVanBanTrinhKyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuyetVanBanTrinhKyRoutingModule { }
