import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhomTaiKhoanPhongBanComponent } from './nhom-tai-khoan-phong-ban.component';

const routes: Routes = [{ path: '', component: NhomTaiKhoanPhongBanComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NhomTaiKhoanPhongBanRoutingModule {}
