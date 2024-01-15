import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DuyetBanGiaoCongViecComponent } from './duyet-ban-giao-cong-viec.component';

const routes: Routes = [{ path: '', component: DuyetBanGiaoCongViecComponent }];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DuyetBanGiaoCongViecRoutingModule {}
