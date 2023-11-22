import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/van-ban-nghiep-vu';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VanBanNghiepVuService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachVanBanDiNghiepVu(timKiemDanhSach: TimKiemDanhSach) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/VanBanDi/VanBanNghiepVu/GetDanhSachVanBanDiNghiepVu',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}
