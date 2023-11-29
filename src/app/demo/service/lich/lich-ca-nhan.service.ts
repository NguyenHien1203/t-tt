import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    constructor(private http: HttpClient) {}

    getDanhSachLichCaNhan(timKiemDanhSach: TimKiemLichCaNhan) {
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
        return this.http
            .post<any>(
                environment.baseUrlApi + '/Lich/LichCaNhan/CapNhatLichCaNhan',
                itemData,
                this.httpOption
            )
    }
    
    themMoiLichCaNhan(itemData: any) {
        return this.http
            .post<any>(
                environment.baseUrlApi + '/Lich/LichCaNhan/ThemMoiLichCaNhan',
                itemData,
                this.httpOption
            )
    }

    xoaLichCaNhan(idLichCaNhan: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Lich/LichCaNhan/XoaLichCaNhan/' +
                idLichCaNhan,
            this.httpOption
        );
    }
}
