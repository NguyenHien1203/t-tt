import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

// import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimKiemTheoSoVanBanComponent } from './demo/service/van-ban-den/tim-kiem-theo-so-van-ban/tim-kiem-theo-so-van-ban.component';
import { ChiTietComponent } from './demo/components/ky-so/luong-ky-so/chi-tiet/chi-tiet.component';
import { ThemMoiComponent } from './demo/components/ky-so/luong-ky-so/them-moi/them-moi.component';
import { CapNhatComponent } from './demo/components/ky-so/luong-ky-so/cap-nhat/cap-nhat.component';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, TimKiemTheoSoVanBanComponent, ChiTietComponent, ThemMoiComponent, CapNhatComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        HttpClientModule,
        HttpClient,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
