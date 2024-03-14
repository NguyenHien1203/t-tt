import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSachDaThuHoi } from 'src/app/models/van-ban-den/van-ban-cho-thu-hoi';
import {
    TimKiemDanhSachVBTC,
    TimKiemDanhSachVTC,
} from 'src/app/models/van-ban-den/van-ban-da-tu-choi';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class VanBanDaTuChoiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachTuChoi(timKiemDanhSach: TimKiemDanhSachVTC) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDen/VanBanDaTuChoi/GetDanhSachVanBanTuChoi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachThuHoi(timKiemDanhSach: TimKiemDanhSachDaThuHoi) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDen/VanBanDaThuHoi/GetDanhSachVanBanThuHoi',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getCoQuan() {
        return this.http
            .get<any>(
                environment.baseUrlApi + '/VanBanDen/VanBanChoThuHoi/GetCoQuan',
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }
    
    getDanhSachLoaiVanBan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TraCuuNangCao/GetDanhSachLoaiVanBan/' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    public getSoVanBan(id: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDi/TraCuuNangCao/GetSoVanBan/' +
                    id
            )
            .toPromise()
            .then((data) => data.objData);
    }
}
