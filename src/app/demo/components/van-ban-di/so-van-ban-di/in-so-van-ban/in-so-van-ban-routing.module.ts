import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InSoVanBanComponent } from './in-so-van-ban.component';

const routes: Routes = [{ path: '', component: InSoVanBanComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InSoVanBanRoutingModule {}
