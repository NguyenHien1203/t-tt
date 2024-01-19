import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TopbarService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getDanhSachThongBao(userId: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Menu/MenuTopBar/GetDanhSachThongBao/' +
                    userId,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachHopThuDen(userId: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Menu/MenuTopBar/GetDanhSachHopThuDen/' +
                    userId,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachHoatDongSapToi(tuNgay: string, userId: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/Menu/MenuTopBar/GetDanhSachHoatDongSapToi?tuNgay=' +
                    tuNgay +
                    '&userId=' +
                    userId,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    chuyenTrangThaiHopThu(idHopThu: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Menu/MenuTopBar/ChuyenTrangThaiHopThu/' +
                idHopThu,
            this.httpOption
        );
    }

    chuyenTrangThaiThongBao(idThongBao: string) {
        return this.http.get<any>(
            environment.baseUrlApi +
                '/Menu/MenuTopBar/ChuyenTrangThaiThongBao/' +
                idThongBao,
            this.httpOption
        );
    }
}
