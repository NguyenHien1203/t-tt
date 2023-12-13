import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';

const routes: Routes = [
    { path: '', component: QuanLyHoSoCoQuanComponent },
    { path: 'them-moi', component: ThemMoiComponent },
    { path: 'cap-nhat', component: CapNhatComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuanLyHoSoCoQuanRoutingModule {}
