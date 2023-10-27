import { NgModule } from '@angular/core';
import { ChucDanhComponent } from './chuc-danh.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      {path: '', component: ChucDanhComponent} 
    ])],
    exports: [RouterModule]
})
export class ChucDanhRoutingModule { }
