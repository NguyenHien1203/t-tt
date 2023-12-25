import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanChoKySoComponent } from './van-ban-cho-ky-so.component';

const routes: Routes = [{ path: '', component: VanBanChoKySoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanChoKySoRoutingModule { }
