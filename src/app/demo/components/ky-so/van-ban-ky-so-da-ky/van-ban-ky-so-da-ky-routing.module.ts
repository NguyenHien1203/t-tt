import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanKySoDaKyComponent } from './van-ban-ky-so-da-ky.component';

const routes: Routes = [{path: '', component:VanBanKySoDaKyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanKySoDaKyRoutingModule { }
