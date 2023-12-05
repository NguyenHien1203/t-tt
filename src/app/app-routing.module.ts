import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/auth/login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    // { path: '', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'danh-muc', loadChildren: () => import('./demo/components/danh-muc/danh-muc.module').then(m => m.DanhMucModule) },
                    { path: 'he-thong', loadChildren: () => import('./demo/components/he-thong/he-thong.module').then(m => m.HeThongModule) },
                    { path: 'van-ban-den', loadChildren: () => import('./demo/components/van-ban-den/van-ban-den.module').then(m => m.VanBanDenModule) },
                    { path: 'thong-tin-khac', loadChildren: () => import('./demo/components/thong-tin-khac/thong-tin-khac.module').then(m => m.ThongTinKhacModule) },
                    { path: 'van-ban-di', loadChildren: () => import('./demo/components/van-ban-di/van-ban-di.module').then(m => m.VanBanDiModule) },
                    { path: 'trao-doi-thong-tin', loadChildren: () => import('./demo/components/trao-doi-thong-tin/trao-doi-thong-tin.module').then(m => m.TraoDoiThongTinModule) },
                    { path: 'lich', loadChildren: () => import('./demo/components/lich/lich.module').then(m => m.LichModule) },
                    { path: 'thong-ke', loadChildren: () => import('./demo/components/thong-ke/thong-ke.module').then(m => m.ThongKeModule) },
                    { path: 'ho-so-cong-viec', loadChildren: () => import('./demo/components/ho-so-cong-viec/ho-so-cong-viec.module').then(m => m.HoSoCongViecModule) },
                ]
            },
            { path: 'in-so-van-ban', loadChildren: () => import('./demo/components/van-ban-di/so-van-ban-di/in-so-van-ban/in-so-van-ban.module').then(m => m.InSoVanBanModule) },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule), component: LoginComponent },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}