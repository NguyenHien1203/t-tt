import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemLichUBNDTinh } from 'src/app/models/thong-tin-khac/lich/lich-ubnd-tinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class LichUbndTinhService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachLichUBNDTinh(timKiemDanhSach: TimKiemLichUBNDTinh) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/Lich/LichUBNDTinh/GetDanhSachLichUBNDTinh',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    getLichUBNDTinhById(idLichUBNDTinh: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Lich/LichUBNDTinh/GetLichUBNDTinhById/' +
                    idLichUBNDTinh,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData);
    }

    capNhatLichUBNDTinh(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichUBNDTinh/CapNhatLichUBNDTinh',
            itemData,
            this.httpOption
        );
    }

    themMoiLichUBNDTinh(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/Lich/LichUBNDTinh/ThemMoiLichUBNDTinh',
            itemData,
            this.httpOption
        );
    }

    themMoiLichUBNDTinhTuImportFile(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/Lich/LichUBNDTinh/ThemMoiLichUBNDTinhTuImportFile',
            itemData,
            this.httpOption
        );
    }

    xoaLichUBNDTinh(idLichUBNDTinh: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichUBNDTinh/XoaLichUBNDTinh/' +
                idLichUBNDTinh,
            this.httpOption
        );
    }
}
