import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuCaNhanComponent } from './hop-thu-ca-nhan.component';

const routes: Routes = [
    {
        path: '',
        component: HopThuCaNhanComponent,
        children: [
            {
                path: ':ncn', // Tham số ncn
                component: HopThuCaNhanComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HopThuCaNhanRoutingModule {}
