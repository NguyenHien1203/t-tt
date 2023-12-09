import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyHoSoCaNhanComponent } from './quan-ly-ho-so-ca-nhan.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';

const routes: Routes = [
    { path: '', component: QuanLyHoSoCaNhanComponent },
    { path: 'them-moi', component: ThemMoiComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuanLyHoSoCaNhanRoutingModule {}
