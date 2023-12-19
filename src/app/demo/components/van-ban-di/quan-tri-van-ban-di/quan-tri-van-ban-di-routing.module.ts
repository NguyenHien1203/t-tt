import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanTriVanBanDiComponent } from './quan-tri-van-ban-di.component';
import { CapNhatVanBanDaGuiComponent } from './cap-nhat-van-ban-da-gui/cap-nhat-van-ban-da-gui.component';

const routes: Routes = [
    { path: '', component: QuanTriVanBanDiComponent },
    { path: 'cap-nhat-van-ban-da-gui', component: CapNhatVanBanDaGuiComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuanTriVanBanDiRoutingModule {}
