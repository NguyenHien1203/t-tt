import { DonVi } from './../../models/danh-muc/don-vi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ChiTietVanBanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getVanBanById(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi + '/ChiTietVanBan/GetVanBanById/' + id,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getVanBanNhanGuiByVanBanId(idVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetVanBanNhanGuiByIdVanBan?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachVanBanDaGui(idVanBan: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetDanhSachVanBanDaGui?idVanBan=' +
                    idVanBan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachVanBanPhanPhoiDonVi(idVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetDanhSachVanBanPhanPhoi?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec +
                    '&phanLoai=' +
                    phanLoai.donVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachVanBanPhanPhoiCaNhan(idVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetDanhSachVanBanPhanPhoi?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec +
                    '&phanLoai=' +
                    phanLoai.caNhan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    GetKiemTraPhanPhoi(
        idVanBan: string,
        idDonViLamViec: string,
        idUser: string,
        idNhomQuyen: string,
        idPhongBan: string
    ) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetKiemTraPhanPhoi?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec +
                    '&idUser=' +
                    idUser +
                    '&idNhomQuyen=' +
                    idNhomQuyen +
                    '&idPhongBan=' +
                    idPhongBan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    GetDanhSachVanBanLienQuan(idVanBan: string, idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/ChiTietVanBan/GetDanhSachVanBanLienQuan?idVanBan=' +
                    idVanBan +
                    '&idDonViLamViec=' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}

const phanLoai = {
    caNhan: 1,
    donVi: 2,
};
