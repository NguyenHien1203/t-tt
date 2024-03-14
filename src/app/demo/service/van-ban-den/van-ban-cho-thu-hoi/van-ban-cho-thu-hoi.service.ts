import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSachThuHoi } from 'src/app/models/van-ban-den/van-ban-cho-thu-hoi';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class VanBanChoThuHoiService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachChoThuHoi(timKiemDanhSach: TimKiemDanhSachThuHoi) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDen/VanBanChoThuHoi/GetDanhSachVanBanChoThuHoi',
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

    ThuHoiVanBan(id: string, idDonViLamViec: string, userId: string) {
        return this.http.post<any>(
            environment.baseUrlApi +
                '/VanBanDen/VanBanChoThuHoi/ThuHoiVanBan?id=' +
                id +
                '&idDonViLamViec=' +
                idDonViLamViec +
                '&userId=' +
                userId,
            this.httpOption
        );
    }
}
