import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemQuanLyDatLaiMatKhau } from 'src/app/models/he-thong/quan-ly-dat-lai-mat-khau';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class QuanLyDatLaiMatKhauService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSach(timKiemDanhSach: TimKiemQuanLyDatLaiMatKhau) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyDatLaiMatKhau/GetDanhSach',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    xuLyYeuCau(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/QuanLyDatLaiMatKhau/XuLyYeuCau',
            itemData,
            this.httpOption
        );
    }

    kiemTraTaiKhoan(userName: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/QuanLyDatLaiMatKhau/KiemTraTaiKhoan/' +
                    userName,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    guiYeuCauDatLai(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/QuanLyDatLaiMatKhau/GuiYeuCauDatLai',
            itemData,
            this.httpOption
        );
    }
}
