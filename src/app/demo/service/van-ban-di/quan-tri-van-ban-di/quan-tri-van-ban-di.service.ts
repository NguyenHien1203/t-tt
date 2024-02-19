import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuanTriVanBanDi } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class QuanTriVanBanDiService {
    url = '/VanBanDi/QuanTriVanBanDi/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
    }

    public getLoaiVanBan(id: string) {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` + this.url + 'GetLoaiVanBan/' + id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachDonViDaGui(id: string) {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetDanhSachDonViDaGui/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public getSoVanBan(id: string) {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` + this.url + 'GetSoVanBan/' + id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    changeSoVanBan(idSoVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/CapNhatMoi/ChangeSoVanBan?idSoVanBan=' +
                    idSoVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public danhSachVanBanDi(danhSach: any) {
        return this.http
            .post<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetDanhSachQuanTriVanBanDi',
                danhSach
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public getVanBanDi(idVb: any): Promise<any> {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetVanBanDi?id=' +
                    idVb,
                this.httpOptions
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public getVanBanDiCapNhat(idVb: string) {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetVanBanDi?id=' +
                    idVb
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public getVanBanNhanGui(
        id: any,
        idDonViLamViec: any,
        idDonViCha: any
    ): Promise<any> {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetVanBanNhanGui?id=' +
                    id +
                    '&idDv=' +
                    idDonViLamViec +
                    '&idDvC=' +
                    idDonViCha
            )
            .toPromise()
            .then((data) => data.objData);
    }

    public getThongTinDaGui(id: string, idDv: string): Promise<any> {
        return this.http
            .get<any>(
                `${environment.baseUrlApi}` +
                    this.url +
                    'GetThongTinDaGui/' +
                    id +
                    '/' +
                    idDv
            )
            .toPromise()
            .then((data) => data.objData);
    }
}
