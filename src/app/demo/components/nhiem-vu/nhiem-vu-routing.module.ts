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
    ]),
  ],
  exports: [RouterModule],
})
export class NhiemVuRoutingModule { }
