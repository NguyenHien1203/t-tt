import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
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
    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) {}

    getDanhSachHoSoCoQuan(timKiemDanhSach: TimKiemQuanLyHoSoCoQuan) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetHoSoCoQuanById/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachQuyen(id: string, idUser: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCoQuan/GetDanhSachQuyen?id=' +
                    id +
                    '&idUser=' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getMaHoSoCoQuan(soKyHieu: string, idDonVi: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/ThemMoiHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    capNhatHoSoCoQuan(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/CapNhatHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    xoaHoSoCoQuan(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCoQuan/XoaHoSoCoQuan/' +
                id
        );
    }

    getDanhSachUserThuocPhongBan(idPhongBan: string, idUser: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
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
