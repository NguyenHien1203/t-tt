import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuCaNhanComponent } from './hop-thu-ca-nhan.component';

const routes: Routes = [
    { path: '', component: HopThuCaNhanComponent },
    { path: 'hop-thu-ca-nhan/:id', component: HopThuCaNhanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HopThuCaNhanRoutingModule {}
