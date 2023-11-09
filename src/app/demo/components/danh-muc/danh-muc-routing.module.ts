import { DonViModule } from './don-vi/don-vi.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([

    { path: 'chuc-danh', data: { breadcrumb: 'Chức danh' }, loadChildren: () => import('./chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule) },
    { path: 'danh-ba', data: { breadcrumb: 'Button' }, loadChildren: () => import('./danh-ba/danh-ba.module').then(m => m.DanhBaModule) },
    { path: 'phong-ban', data: { breadcrumb: 'Phòng Ban' }, loadChildren: () => import('./phong-ban/phong-ban.module').then(m => m.PhongBanModule) },
    { path: 'lien-ket', data: { breadcrumb: 'Liên Kết' }, loadChildren: () => import('./lien-ket/lien-ket.module').then(m => m.LienKetModule) },
    { path: 'linh-vuc', data: { breadcrumb: 'Lĩnh Vực' }, loadChildren: () => import('./linh-vuc/linh-vuc.module').then(m => m.LinhVucModule) },
    { path: 'loai-ho-so', data: { breadcrumb: 'Loại hồ sơ' }, loadChildren: () => import('./loai-ho-so/loai-ho-so.module').then(m => m.LoaiHoSoModule) },
    { path: 'loai-nhiem-vu', data: { breadcrumb: 'Loại nhiệm vụ' }, loadChildren: () => import('./loai-nhiem-vu/loai-nhiem-vu.module').then(m => m.LoaiNhiemVuModule) },
    { path: 'don-vi', data: { breadcrumb: 'Đơn vị' }, loadChildren: () => import('./don-vi/don-vi.module').then(m => m.DonViModule) },
    { path: 'loai-van-ban', data: { breadcrumb: 'Loại văn bản' }, loadChildren: () => import('./loai-van-ban/loai-van-ban.module').then(m => m.LoaiVanBanModule) },
    { path: 'so-van-ban', data: { breadcrumb: 'Số văn bản' }, loadChildren: () => import('./so-van-ban/so-van-ban.module').then(m => m.SoVanBanModule) },
    { path: 'tinh-chat-nhiem-vu', data: { breadcrumb: 'Tính chất nhiệm vụ' }, loadChildren: () => import('./tinh-chat-nhiem-vu/tinh-chat-nhiem-vu.module').then(m => m.TinhChatNhiemVuModule) },

  ])],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
