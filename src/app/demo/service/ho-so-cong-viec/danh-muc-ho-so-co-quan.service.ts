import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhMucHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-co-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DanhMucHoSoCoQuanService {
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

    getDanhSachDanhMucHoSoCoQuan(idDonVi: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCoQuan/GetDanhMucHoSoCoQuan/' +
                    idDonVi,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhMucHoSoCoQuanId(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCoQuan/GetDanhMucHoSoCoQuanById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiDanhMucHoSoCoQuan(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/ThemMoiDanhMucHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    capNhatDanhMucHoSoCoQuan(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/CapNhatDanhMucHoSoCoQuan',
            itemData,
            this.httpOption
        );
    }

    xoaDanhMucHoSoCoQuan(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCoQuan/XoaDanhMucHoSoCoQuan/' +
                id
        );
    }
}
