import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XuLyCongViecComponent } from './xu-ly-cong-viec.component';
import { LuongXuLyComponent } from './luong-xu-ly/luong-xu-ly.component';

const routes: Routes = [
    { path: '', component: XuLyCongViecComponent },
    { path: 'luong-xu-ly', component: LuongXuLyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class XuLyCongViecRoutingModule {}
