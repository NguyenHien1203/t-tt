import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemNhomQuyen } from 'src/app/models/he-thong/nhom-quyen';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomQuyenService {
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

    getDanhSachNhomQuyen(timKiemDanhSach: TimKiemNhomQuyen) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachNhomQuyen',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getNhomQuyenById(id?: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetNhomQuyenById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachQuyenChuaCap(idNhomQuyen?: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachQuyenChuaCap/' +
                    idNhomQuyen,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachQuyenDuocCap(idNhomQuyen?: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachQuyenDuocCap/' +
                    idNhomQuyen,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiNhomQuyen(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/ThemMoiNhomQuyen',
            itemData,
            this.httpOption
        );
    }

    capNhatNhomQuyen(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/CapNhatNhomQuyen',
            itemData,
            this.httpOption
        );
    }

    xoaNhomQuyen(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/XoaNhomQuyen/' + id,
            this.httpOption
        );
    }

    themToanQuyen(idNhomQuyen: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/ThemToanQuyen/' +
                idNhomQuyen,
            this.httpOption
        );
    }

    themQuyen(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/ThemQuyen',
            itemData,
            this.httpOption
        );
    }

    xoaToanQuyen(idNhomQuyen: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/XoaToanQuyen/' +
                idNhomQuyen,
            this.httpOption
        );
    }

    xoaQuyen(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/XoaQuyen',
            itemData,
            this.httpOption
        );
    }
}
