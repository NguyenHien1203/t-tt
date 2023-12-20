import { TrinhKyVanBanModule } from './trinh-ky-van-ban/trinh-ky-van-ban.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'luong-ky-so',
    data: { breadcrumb: 'Luồng ký số' },
    loadChildren: () =>
      import('./luong-ky-so/luong-ky-so.module').then(
        (m) => m.LuongKySoModule
      ),
  },
  {
    path: 'trinh-ky-van-ban',
    data: { breadcrumb: 'Trình ký văn bản' },
    loadChildren: () =>
      import('./trinh-ky-van-ban/trinh-ky-van-ban.module').then(
        (m) => m.TrinhKyVanBanModule
      ),
  },
  {
    path: 'trinh-ky-tra-lai',
    data: { breadcrumb: 'Trình ký trả lại' },
    loadChildren: () =>
      import('./trinh-ky-tra-lai/trinh-ky-tra-lai.module').then(
        (m) => m.TrinhKyTraLaiModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KySoRoutingModule { }
