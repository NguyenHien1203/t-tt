import { VanBanChoPhatHanh } from './../../../models/ky-so/van-ban-cho-phat-hanh/van-ban-cho-phat-hanh';
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
  {
    path: 'duyet-van-ban-trinh-ky',
    data: { breadcrumb: 'Duyệt văn bản trình ký' },
    loadChildren: () =>
      import('./duyet-van-ban-trinh-ky/duyet-van-ban-trinh-ky.module').then(
        (m) => m.DuyetVanBanTrinhKyModule
      ),
  },
  {
    path: 'van-ban-ky-so-da-duyet',
    data: { breadcrumb: 'Văn bản ký số đã duyệt' },
    loadChildren: () =>
      import('./van-ban-ky-so-da-duyet/van-ban-ky-so-da-duyet.module').then(
        (m) => m.VanBanKySoDaDuyetModule
      ),
  },
  {
    path: 'van-ban-cho-ky-so',
    data: { breadcrumb: 'Văn bản chờ ký số' },
    loadChildren: () =>
      import('./van-ban-cho-ky-so/van-ban-cho-ky-so.module').then(
        (m) => m.VanBanChoKySoModule
      ),
  },
  {
    path: 'van-ban-ky-so-da-ky',
    data: { breadcrumb: 'Văn bản ký số đã ký' },
    loadChildren: () =>
      import('./van-ban-ky-so-da-ky/van-ban-ky-so-da-ky.module').then(
        (m) => m.VanBanKySoDaKyModule
      ),
  },
  {
    path: 'van-ban-cho-phat-hanh',
    data: { breadcrumb: 'Văn bản chờ phát hành' },
    loadChildren: () =>
      import('./van-ban-cho-phat-hanh/van-ban-cho-phat-hanh.module').then(
        (m) => m.VanBanChoPhatHanhModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KySoRoutingModule { }
