import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoVanBanDiComponent } from './so-van-ban-di.component';
import { InSoVanBanComponent } from './in-so-van-ban/in-so-van-ban.component';

const routes: Routes = [
    { path: '', component: SoVanBanDiComponent },
    { path: 'in-so-van-ban', component: InSoVanBanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SoVanBanDiRoutingModule {}
