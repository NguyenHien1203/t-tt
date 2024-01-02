import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhomTaiKhoanCaNhanComponent } from './nhom-tai-khoan-ca-nhan.component';

const routes: Routes = [{ path: '', component: NhomTaiKhoanCaNhanComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NhomTaiKhoanCaNhanRoutingModule {}
