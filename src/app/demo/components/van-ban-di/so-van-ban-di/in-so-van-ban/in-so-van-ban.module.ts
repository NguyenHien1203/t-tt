import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InSoVanBanRoutingModule } from './in-so-van-ban-routing.module';
import { InSoVanBanComponent } from './in-so-van-ban.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [InSoVanBanComponent],
    imports: [
        ButtonModule,
        TableModule,
        CommonModule,
        InSoVanBanRoutingModule,
    ],
})
export class InSoVanBanModule {}
