import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemNhomQuyen } from 'src/app/models/he-thong/nhom-quyen';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class NhomQuyenService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachNhomQuyen(timKiemDanhSach: TimKiemNhomQuyen) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachNhomQuyen',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getNhomQuyenById(id?: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetNhomQuyenById/' +
                    id,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachQuyenChuaCap(idNhomQuyen?: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachQuyenChuaCap/' +
                    idNhomQuyen,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    getDanhSachQuyenDuocCap(idNhomQuyen?: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/HeThong/NhomQuyen/GetDanhSachQuyenDuocCap/' +
                    idNhomQuyen,
                this.httpOption
            )
            .toPromise()
            .then((data) => data.objData);
    }

    themMoiNhomQuyen(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/ThemMoiNhomQuyen',
            itemData,
            this.httpOption
        );
    }

    capNhatNhomQuyen(itemData: any) {
        return this.http.post<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/CapNhatNhomQuyen',
            itemData,
            this.httpOption
        );
    }

    xoaNhomQuyen(id: string) {
        return this.http.get<any>(
            environment.baseUrlApi + '/HeThong/NhomQuyen/XoaNhomQuyen/' + id,
            this.httpOption
        );
    }

    themToanQuyen(idNhomQuyen: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/ThemToanQuyen/' +
                idNhomQuyen,
            this.httpOption
        );
    }
    
    themQuyen(itemData : any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/ThemQuyen' ,
                itemData,
            this.httpOption
        );
    }

    xoaToanQuyen(idNhomQuyen: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/XoaToanQuyen/' +
                idNhomQuyen,
            this.httpOption
        );
    }

    xoaQuyen(itemData : any) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/HeThong/NhomQuyen/XoaQuyen' ,
                itemData,
            this.httpOption
        );
    }
}
