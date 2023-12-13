import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuongKySoComponent } from './luong-ky-so.component';

const routes: Routes = [{ path: '', component: LuongKySoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuongKySoRoutingModule { }
