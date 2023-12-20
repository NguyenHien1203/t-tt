import { NgModule } from '@angular/core';
import { TaoNhiemVuComponent } from './tao-nhiem-vu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TaoNhiemVuComponent },
  ])],
  exports: [RouterModule]
})
export class TaoNhiemVuRoutingModule { }
