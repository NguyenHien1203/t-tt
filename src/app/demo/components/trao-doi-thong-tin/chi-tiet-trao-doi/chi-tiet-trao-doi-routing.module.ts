import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChiTietTraoDoiComponent } from './chi-tiet-trao-doi.component';

const routes: Routes = [
    {
        path: '',
        component: ChiTietTraoDoiComponent,
        children: [
            {
                path: ':traoDoiId', // Tham số ncn
                component: ChiTietTraoDoiComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChiTietTraoDoiRoutingModule {}
