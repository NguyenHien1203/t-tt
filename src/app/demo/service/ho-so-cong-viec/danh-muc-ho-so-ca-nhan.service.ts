import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhMucHoSoCaNhan } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class DanhMucHoSoCaNhanService {
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

    getDanhSachDanhMucHoSoCaNhan(idUser: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCaNhan/GetDanhMucHoSoCaNhan/' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getDanhMucHoSoCaNhanId(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HoSoCongViec/DanhMucHoSoCaNhan/GetDanhMucHoSoCaNhanById/' +
                    id
            )
            .toPromise()
            .then((res) => res.objData);
    }

    themMoiDanhMucHoSoCaNhan(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCaNhan/ThemMoiDanhMucHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatDanhMucHoSoCaNhan(itemData: any) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCaNhan/CapNhatDanhMucHoSoCaNhan',
            itemData,
            this.httpOption
        );
    }

    xoaDanhMucHoSoCaNhan(id: string) {
        if (!this.auth.CheckLogin()) this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCaNhan/XoaDanhMucHoSoCaNhan/' +
                id
        );
    }
}
