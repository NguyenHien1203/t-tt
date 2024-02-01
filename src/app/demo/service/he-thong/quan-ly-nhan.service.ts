import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemNhan } from 'src/app/models/he-thong/quan-ly-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachNhan(timKiemDanhSach: TimKiemNhan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi + '/HeThong/QuanLyNhan/GetDanhSachNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachNhanCha(idUser: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyNhan/GetDanhSachNhanCha/' +
                    idUser,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getNhanById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyNhan/GetNhanById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/ThemMoiNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/CapNhatNhan',
            itemData,
            this.httpOption
        );
    }

    xoaNhan(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi + '/HeThong/QuanLyNhan/XoaNhan/' + id,
            this.httpOption
        );
    }
}
