import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tao-nhiem-vu',
        data: { breadcrumb: 'Button' },
        loadChildren: () =>
          import('./tao-nhiem-vu/tao-nhiem-vu.module').then(
            (m) => m.TaoNhiemVuModule
          ),
      },
      { path: 'them-moi-nhiem-vu', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tao-nhiem-vu/them-moi/them-moi.module').then(m => m.ThemMoiModule) },
      { path: 'cap-nhat-nhiem-vu', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tao-nhiem-vu/cap-nhat/cap-nhat.module').then(m => m.CapNhatModule) },
      { path: 'cap-nhat-tien-do', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-tien-do/cap-nhat-tien-do.module').then((m) => m.CapNhatTienDoModule) },
      { path: 'duyet-hoan-thanh', data: { breadcrumb: 'Button' }, loadChildren: () => import('./duyet-hoan-thanh/duyet-hoan-thanh.module').then((m) => m.DuyetHoanThanhModule) },
      { path: 'duyet-nhiem-vu', data: { breadcrumb: 'Button' }, loadChildren: () => import('./duyet-nhiem-vu/duyet-nhiem-vu.module').then((m) => m.DuyetNhiemVuModule) },
      { path: 'cap-nhat-duyet-nhiem-vu', data: { breadcrumb: 'Button' }, loadChildren: () => import('./duyet-nhiem-vu/cap-nhat/cap-nhat.module').then((m) => m.CapNhatModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class NhiemVuRoutingModule { }
