import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinhChatNhiemVuComponent } from './tinh-chat-nhiem-vu.component';

const routes: Routes = [{ path: '', component: TinhChatNhiemVuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TinhChatNhiemVuRoutingModule { }
