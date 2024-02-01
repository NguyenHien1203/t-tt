import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemLichCaNhan } from 'src/app/models/thong-tin-khac/lich/lich-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LichCaNhanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachLichCaNhan(timKiemDanhSach: TimKiemLichCaNhan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/LichCaNhan/GetDanhSachLichCaNhan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getLichCaNhanById(idLichCaNhan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/LichCaNhan/GetLichCaNhanById/' +
                    idLichCaNhan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatLichCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi + '/Lich/LichCaNhan/CapNhatLichCaNhan',
                itemData,
                this.httpOption
            )
    }
    
    themMoiLichCaNhan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi + '/Lich/LichCaNhan/ThemMoiLichCaNhan',
                itemData,
                this.httpOption
            )
    }

    xoaLichCaNhan(idLichCaNhan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichCaNhan/XoaLichCaNhan/' +
                idLichCaNhan,
            this.httpOption
        );
    }
}
