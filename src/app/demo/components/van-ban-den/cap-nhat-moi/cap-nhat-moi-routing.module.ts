import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CapNhatMoiComponent } from './cap-nhat-moi.component';


@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: CapNhatMoiComponent} 
  ])],
  exports: [RouterModule]
})
export class CapNhatMoiRoutingModule { }
