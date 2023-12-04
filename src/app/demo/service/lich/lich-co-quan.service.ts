import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    constructor(private http: HttpClient) {}

    getDanhSachLichCoQuan(timKiemDanhSach: TimKiemLichCoQuan) {
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
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/CapNhatLichCoQuan',
            itemData,
            this.httpOption
        );
    }

    themMoiLichCoQuan(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/ThemMoiLichCoQuan',
            itemData,
            this.httpOption
        );
    }

    themMoiLichCoQuanTuImportFile(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/LichCoQuan/ThemMoiLichCoQuanTuImportFile',
            itemData,
            this.httpOption
        );
    }

    taiMauExcel(urlDownLoad: string) {
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
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichCoQuan/XoaLichCoQuan/' +
                idLichCoQuan,
            this.httpOption
        );
    }

    xuatBanLichCoQuan(idLichCoQuan: string) {
        return this.http.get<any>(
            environment.baseUrlApi + '/Lich/LichCoQuan/XuatBan/' + idLichCoQuan,
            this.httpOption
        );
    }

    xuLyLichCoQuan(idLichCoQuan: string, action: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichCoQuan/XuLyLichCoQuan?idLichCoQuan=' +
                idLichCoQuan +
                '&action=' +
                action,
            this.httpOption
        );
    }
}
