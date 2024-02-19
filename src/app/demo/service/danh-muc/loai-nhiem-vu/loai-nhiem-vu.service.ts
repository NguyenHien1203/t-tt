import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    LoaiNhiemVu,
    TimKiemDanhSachLoaiNhiemVu,
} from 'src/app/models/danh-muc/loai-nhiem-vu/loai-nhiem-vu';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class LoaiNhiemVuService {
    private httpOption = {
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

    getDanhSachLoaiNhiemVu(timKiemDanhSach: TimKiemDanhSachLoaiNhiemVu) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/DanhMuc/LoaiNhiemVu/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as LoaiNhiemVu[]);
    }
    getLoaiNhiemVuId(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/DanhMuc/LoaiNhiemVu/GetLoaiNhiemVuById/' +
                    id
            )
            .pipe(map((response: any) => response.objData));
    }

    themMoiLoaiNhiemVu(modelLienKet: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/DanhMuc/LoaiNhiemVu/ThemMoiLoaiNhiemVu',
            modelLienKet,
            this.httpOption
        );
    }

    capNhatLoaiNhiemVu(modelLienKet: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/DanhMuc/LoaiNhiemVu/CapNhatLoaiNhiemVu',
            modelLienKet,
            this.httpOption
        );
    }

    xoaLoaiNhiemVu(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/DanhMuc/LoaiNhiemVu/DeleteLoaiNhiemVu/' +
                id
        );
    }
}
