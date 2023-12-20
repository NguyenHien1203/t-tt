import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanKySoDaDuyetComponent } from './van-ban-ky-so-da-duyet.component';

const routes: Routes = [{ path: '', component: VanBanKySoDaDuyetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanKySoDaDuyetRoutingModule { }
