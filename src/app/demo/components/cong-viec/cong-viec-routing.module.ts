import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'qly-cviec-psinh',
                data: { breadcrumb: 'Button' },
                loadChildren: () =>
                    import('./qly-cviec-psinh/qly-cviec-psinh.module').then(
                        (m) => m.QlyCviecPsinhModule
                    ),
            },
            { path: 'them-moi-cong-viec', data: { breadcrumb: 'Button' }, loadChildren: () => import('./qly-cviec-psinh/them-moi/them-moi.module').then(m => m.ThemMoiModule) },
            {
              path: 'xu-ly-cong-viec',
              data: { breadcrumb: 'Xử lý công việc' },
              loadChildren: () =>
                  import('./xu-ly-cong-viec/xu-ly-cong-viec.module').then(
                      (m) => m.XuLyCongViecModule
                  ),
          },
        ]),
    ],
    exports: [RouterModule],
})
export class CongViecRoutingModule {}
