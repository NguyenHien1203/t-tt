import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiVanBanComponent } from './gui-van-ban.component';

const routes: Routes = [{path : '', component : GuiVanBanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiVanBanRoutingModule { }
