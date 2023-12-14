import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSachTheoSoVanBan } from 'src/app/models/van-ban-den/tim-kiem-theo-so-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class TimKiemTheoSoVanBanService {
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private http: HttpClient) {}

    getDanhSachSoVanBan(timKiemDanhSach: TimKiemDanhSachTheoSoVanBan) {
        return this.http
            .post<any>(
                environment.baseUrlApi +
                    '/VanBanDen/TimKiemTheoSoVanBan/GetDanhSachSoVanBan',
                timKiemDanhSach,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getSoVanBan(idDonViLamViec: string) {
        return this.http
            .get<any>(
                environment.baseUrlApi +
                    '/VanBanDen/TimKiemTheoSoVanBan/GetSoVanBan?idDonViLamViec=' +
                    idDonViLamViec,
                this.httpOption
            )
            .toPromise()
            .then((res) => res.objData as any[]);
    }

    getDanhSachCQBH() {
      return this.http
          .get<any>(
              environment.baseUrlApi +
                  '/VanBanDen/TimKiemTheoSoVanBan/GetDanhSachCQBH',
              this.httpOption
          )
          .toPromise()
          .then((res) => res.objData as any[]);
  }
}
