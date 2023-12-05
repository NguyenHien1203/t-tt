import { VanBanDiModule } from './../van-ban-di/van-ban-di.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'van-ban-nhan',
        data: { breadcrumb: 'Thống kê văn bản nhận' },
        loadChildren: () =>
            import('./van-ban-nhan/van-ban-nhan.module').then(
                (m) => m.VanBanNhanModule
            ),
    },
    {
        path: 'van-ban-di',
        data: { breadcrumb: 'Thống kê văn bản đi' },
        loadChildren: () =>
            import('./van-ban-di/van-ban-di.module').then(
                (m) => m.VanBanDiModule
            ),
    },
    {
        path: 'xu-ly-cong-viec',
        data: { breadcrumb: 'Xử lý công việc' },
        loadChildren: () =>
            import('./xu-ly-cong-viec/xu-ly-cong-viec.module').then(
                (m) => m.XuLyCongViecModule
            ),
    },
    {
      path: 'muc-do-truy-cap',
      data: { breadcrumb: 'Mức độ truy cập' },
      loadChildren: () =>
          import('./muc-do-truy-cap/muc-do-truy-cap.module').then(
              (m) => m.MucDoTruyCapModule
          ),
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThongKeRoutingModule {}
