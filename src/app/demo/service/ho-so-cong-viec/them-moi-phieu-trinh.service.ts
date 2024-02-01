import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ThemMoiPhieuTrinhService {
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

    getDanhSachPhieuTrinh(timKiemDanhSach: TimKiemPhieuTrinh) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        timKiemDanhSach.ngayTrinh = format(
            new Date(timKiemDanhSach.ngayTrinh),
            'yyyy-MM-dd'
        );

        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachPhieuTrinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getPhieuTrinhById(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/XuLyPhieuTrinh/GetPhieuTrinhById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachVanBanLienQuan(idDonViLamViec: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachVanBanLienQuan/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLanhDaoDuyet(idDonViLamViec: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachLanhDaoDuyet/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhSachLanhDaoKy(idDonViLamViec: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/PhieuTrinh/GetDanhSachLanhDaoKy/' +
                    idDonViLamViec
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiPhieuTrinh(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/ThemMoiPhieuTrinh',
            itemData,
            this.httpOption
        );
    }

    capNhatPhieuTrinh(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/CapNhatPhieuTrinh',
            itemData,
            this.httpOption
        );
    }

    xoaPhieuTrinh(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/PhieuTrinh/XoaPhieuTrinh/' +
                id
        );
    }
}
