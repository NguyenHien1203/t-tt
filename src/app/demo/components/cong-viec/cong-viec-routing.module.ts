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
            { path: 'cap-nhat-cong-viec', data: { breadcrumb: 'Button' }, loadChildren: () => import('./qly-cviec-psinh/cap-nhat/cap-nhat.module').then(m => m.CapNhatModule) },
            {
                path: 'xu-ly-cong-viec',
                data: { breadcrumb: 'Xử lý công việc' },
                loadChildren: () =>
                    import('./xu-ly-cong-viec/xu-ly-cong-viec.module').then(
                        (m) => m.XuLyCongViecModule
                    ),
            }, 
            {
                path: 'theo-doi-tien-do',
                data: { breadcrumb: 'Button' },
                loadChildren: () =>
                    import('./theo-doi-tien-do/theo-doi-tien-do.module').then(
                        (m) => m.TheoDoiTienDoModule
                    ),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class CongViecRoutingModule { }
