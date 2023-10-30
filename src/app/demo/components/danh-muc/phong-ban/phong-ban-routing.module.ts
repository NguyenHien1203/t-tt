import { NgModule } from '@angular/core';
import { PhongBanComponent } from './phong-ban.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      {path: '', component: PhongBanComponent} 
    ])],
    exports: [RouterModule]
})
export class PhongBanRoutingModule { }
