import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { RouterModule } from '@angular/router';
import { ChucDanhComponent } from './chuc-danh/chuc-danh.component';
import { NotfoundComponent } from '../notfound/notfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
          children: [
              { path: 'chuc-danh', loadChildren: () => import('./chuc-danh/chuc-danh-routing.module').then(m => m.ChucDanhRoutingModule) },
              { path: 'linh-vuc', loadChildren: () => import('./linh-vuc/linh-vuc.component').then(m => m.LinhVucComponent) },
            ]
      },
      { path: 'notfound', component: NotfoundComponent },
      { path: '**', redirectTo: '/notfound' },
  ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' }),
CommonModule,
    DanhMucRoutingModule
  ]
})
export class DanhMucModule { }
