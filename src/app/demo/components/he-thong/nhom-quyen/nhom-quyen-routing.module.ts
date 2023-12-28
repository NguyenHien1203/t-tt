import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhomQuyenComponent } from './nhom-quyen.component';
import { GanQuyenComponent } from './gan-quyen/gan-quyen.component';

const routes: Routes = [
    { path: '', component: NhomQuyenComponent },
    {
        path: 'gan-quyen',
        component: GanQuyenComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NhomQuyenRoutingModule {}
