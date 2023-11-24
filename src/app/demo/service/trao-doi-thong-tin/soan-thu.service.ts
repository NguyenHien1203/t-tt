import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/nhan-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class SoanThuService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachNhanCaNhan(timKiemDanhSach: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetDanhSachNhanCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachDonVi() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachDonVi',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachPhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachPhongBan?idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachNhomNguoiDung(
        idUser: string,
        idPhongBan: string,
        idDonVi: string
    ) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachNhomNguoiDung?idUser=' +
                    idUser +
                    '&idPhongBan=' +
                    idPhongBan +
                    '&idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachUserThuocPhongBan(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUserThuocPhongBan/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachUserThuocNhomNguoiDung(idNhomNguoiDung: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUserThuocNhomNguoiDung/' +
                    idNhomNguoiDung,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachNguoiDungs() {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/SoanThu/GetDanhSachUsers',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    guiDi(itemData: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/TraoDoiThongTin/SoanThu/GuiDi',
                itemData,
                this.httpOption
            )
    }
}
