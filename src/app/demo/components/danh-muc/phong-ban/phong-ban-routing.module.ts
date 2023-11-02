import { NgModule } from '@angular/core';
import { PhongBanComponent } from './phong-ban.component';
import { RouterModule } from '@angular/router';
import { CapNhatPhongBanComponent } from './cap-nhat-phong-ban/cap-nhat-phong-ban.component';

@NgModule({
  imports: [RouterModule.forChild([
      {path: '', component: PhongBanComponent} ,

      {path: 'phong-ban/cap-nhat-phong-ban/:id', component: CapNhatPhongBanComponent} 
      
    ])],
    exports: [RouterModule]
})
export class PhongBanRoutingModule { }
