import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ChiTietNhomTaiKhoanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachNguoiDungTrongNhom(id : string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomTaiKhoanPhongBan/GetDanhSachNguoiDungTrongNhom/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }
}
