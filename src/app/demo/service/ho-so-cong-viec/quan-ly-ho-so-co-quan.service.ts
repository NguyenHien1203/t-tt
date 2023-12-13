import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    TimKiemCongViecDinhKem,
    TimKiemPhieuTrinhDinhKem,
    TimKiemVanBanDinhKem,
} from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';
import { TimKiemQuanLyHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-co-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyHoSoCoQuanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachHoSoCoQuan(timKiemDanhSach: TimKiemQuanLyHoSoCoQuan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachHoSoCoQuan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getHoSoCoQuanId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetHoSoCoQuanById/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getMaHoSoCoQuan(soKyHieu: string, idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetMaHoSoCoQuan?soKyHieu=' +
                    soKyHieu +
                    '&idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.data);
    }

    getNgayKetThucHoSo(thoiHanBaoQuan: string, ngayBatDau: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetNgayKetThucHoSo?thoiHanBaoQuan=' +
                    thoiHanBaoQuan +
                    '&ngayBatDau=' +
                    ngayBatDau,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLoaiHoSo(idDonVi: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachLoaiHoSo/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachPhongBan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachPhongBan/' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachNhomNguoiDung(
        idDonViLamViec: string,
        idPhongBan: string,
        idUser: string
    ) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachNhomNguoiDung?idDonViLamViec=' +
                    idDonViLamViec +
                    '&idPhongBan=' +
                    idPhongBan +
                    '&idUser=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonNhanhNguoiDung(idDonViLamViec: string, idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachUserChonNhanh?idDonViLamViec=' +
                    idDonViLamViec +
                    '&idUser=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonVanBan(timKiemDanhSach: TimKiemVanBanDinhKem) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachChonVanBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonCongViec(timKiemDanhSach: TimKiemCongViecDinhKem) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachChonCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonPhieuTrinh(timKiemDanhSach: TimKiemPhieuTrinhDinhKem) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachChonPhieuTrinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiHoSoCoQuan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/ThemMoiHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    capNhatHoSoCoQuan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/CapNhatHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    xoaHoSoCoQuan(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/XoaHoSoCoQuan/' +
                id
        );
    }

    getDanhSachUserThuocPhongBan(idPhongBan: string, idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachUserThuocPhongBan?idPhongBan=' +
                    idPhongBan +
                    '&idUser=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachUserThuocNhomNguoiDung(idNhomUser: string, idUser: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachUserThuocNhomNguoiDung?idNhomUser=' +
                    idNhomUser +
                    '&idUser=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }
}
