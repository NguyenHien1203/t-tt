import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhanCaNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachNhanCaNhan(timKiemDanhSach: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetDanhSachNhanCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    themMoiNhanCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/NhanCaNhan/ThemMoiNhanCaNhan',
            itemData,
            this.httpOption
        );
    }

    capNhatNhanCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/NhanCaNhan/CapNhatNhanCaNhan',
            itemData,
            this.httpOption
        );
    }

    getNhanCaNhanById(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/TraoDoiThongTin/NhanCaNhan/GetNhanCaNhanById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    xoaNhanCaNhan(id: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/NhanCaNhan/DeleteNhanCaNhan/' +
                id,
            this.httpOption
        );
    }
}
