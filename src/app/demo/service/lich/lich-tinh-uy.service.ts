import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemLichTinhUy } from 'src/app/models/thong-tin-khac/lich/lich-tinh-uy';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LichTinhUyService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachLichTinhUy(timKiemDanhSach: TimKiemLichTinhUy) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/LichTinhUy/GetDanhSachLichTinhUy',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getLichTinhUyById(idLichTinhUy: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/LichTinhUy/GetLichTinhUyById/' +
                    idLichTinhUy,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatLichTinhUy(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichTinhUy/CapNhatLichTinhUy',
            itemData,
            this.httpOption
        );
    }

    themMoiLichTinhUy(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichTinhUy/ThemMoiLichTinhUy',
            itemData,
            this.httpOption
        );
    }

    themMoiLichTinhUyTuImportFile(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/LichTinhUy/ThemMoiLichTinhUyTuImportFile',
            itemData,
            this.httpOption
        );
    }

    xoaLichTinhUy(idLichTinhUy: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichTinhUy/XoaLichTinhUy/' +
                idLichTinhUy,
            this.httpOption
        );
    }
}
