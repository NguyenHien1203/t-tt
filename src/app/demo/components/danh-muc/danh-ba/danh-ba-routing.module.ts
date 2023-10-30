import { NgModule } from '@angular/core';
import { DanhBaComponent } from './danh-ba.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      {path: '', component: DanhBaComponent} 
    ])],
    exports: [RouterModule]
})
export class DanhBaRoutingModule { }
