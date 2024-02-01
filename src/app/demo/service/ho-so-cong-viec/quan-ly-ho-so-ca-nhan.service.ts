import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import {
    TimKiemCongViecDinhKem,
    TimKiemPhieuTrinhDinhKem,
    TimKiemQuanLyHoSoCaNhan,
    TimKiemVanBanDinhKem,
} from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyHoSoCaNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachHoSoCaNhan(timKiemDanhSach: TimKiemQuanLyHoSoCaNhan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachHoSoCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getMaHoSoCaNhan(soKyHieu: string, idDonVi: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetMaHoSoCaNhan?soKyHieu=' +
                    soKyHieu +
                    '&idDonVi=' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.data);
    }

    getNgayKetThucHoSo(thoiHanBaoQuan: string, ngayBatDau: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetNgayKetThucHoSo?thoiHanBaoQuan=' +
                    thoiHanBaoQuan +
                    '&ngayBatDau=' +
                    ngayBatDau,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLoaiHoSo(idDonVi: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachLoaiHoSo/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonVanBan(timKiemDanhSach: TimKiemVanBanDinhKem) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonVanBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonCongViec(timKiemDanhSach: TimKiemCongViecDinhKem) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonCongViec',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachChonPhieuTrinh(timKiemDanhSach: TimKiemPhieuTrinhDinhKem) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSachChonPhieuTrinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getHoSoCaNhanId(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/QuanLyHoSoCaNhan/GetHoSoCaNhanById/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiHoSoCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/ThemMoiHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatHoSoCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/CapNhatHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    xoaHoSoCaNhan(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/XoaHoSoCaNhan/' +
                id
        );
    }
}
