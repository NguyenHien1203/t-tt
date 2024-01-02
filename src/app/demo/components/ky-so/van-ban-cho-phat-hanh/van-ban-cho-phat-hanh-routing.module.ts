import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanChoPhatHanhComponent } from './van-ban-cho-phat-hanh.component';

const routes: Routes = [{ path: '', component: VanBanChoPhatHanhComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanChoPhatHanhRoutingModule { }
