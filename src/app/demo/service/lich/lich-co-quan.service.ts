import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemLichCoQuan } from 'src/app/models/thong-tin-khac/lich/lich-co-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LichCoQuanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient, private auth: AuthService, private router : Router) {}

    getDanhSachLichCoQuan(timKiemDanhSach: TimKiemLichCoQuan) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/LichCoQuan/GetDanhSachLichCoQuan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getLichCoQuanById(idLichCoQuan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/LichCoQuan/GetLichCoQuanById/' +
                    idLichCoQuan,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatLichCoQuan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/CapNhatLichCoQuan',
            itemData,
            this.httpOption
        );
    }

    themMoiLichCoQuan(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/ThemMoiLichCoQuan',
            itemData,
            this.httpOption
        );
    }

    themMoiLichCoQuanTuImportFile(itemData: any) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/LichCoQuan/ThemMoiLichCoQuanTuImportFile',
            itemData,
            this.httpOption
        );
    }

    taiMauExcel(urlDownLoad: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        const headers = new HttpHeaders().set(
            'Accept',
            'application/octet-stream'
        );
        return this.http.get(environment.baseUrlApi + urlDownLoad, {
            headers,
            responseType: 'blob', // Xác định responseType là 'blob'.
        });
    }

    xoaLichCoQuan(idLichCoQuan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichCoQuan/XoaLichCoQuan/' +
                idLichCoQuan,
            this.httpOption
        );
    }

    xuatBanLichCoQuan(idLichCoQuan: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/XuatBan/' + idLichCoQuan,
            this.httpOption
        );
    }

    xuLyLichCoQuan(idLichCoQuan: string, action: string) {
       if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/QuanTriLich/XuLyQuanTriLich?idQuanTriLich=' +
                idLichCoQuan +
                '&action=' +
                action,
            this.httpOption
        );
    }
}
