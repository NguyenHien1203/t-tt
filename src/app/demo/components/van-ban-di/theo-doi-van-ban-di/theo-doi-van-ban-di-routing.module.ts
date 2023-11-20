import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheoDoiVanBanDiComponent } from './theo-doi-van-ban-di.component';
import { BaoCaoComponent } from './bao-cao/bao-cao.component';

const routes: Routes = [
    { path: '', component: TheoDoiVanBanDiComponent },
    { path: 'bao-cao', component: BaoCaoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TheoDoiVanBanDiRoutingModule {}
