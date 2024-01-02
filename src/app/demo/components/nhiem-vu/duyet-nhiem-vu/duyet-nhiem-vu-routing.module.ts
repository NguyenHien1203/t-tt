import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuyetNhiemVuComponent } from './duyet-nhiem-vu.component';

const routes: Routes = [{ path: '', component: DuyetNhiemVuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuyetNhiemVuRoutingModule { }
