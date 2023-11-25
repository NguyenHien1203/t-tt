import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/hop-thu-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HopThuCaNhanService {
  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachHopThuCaNhan(timKiemDanhSach: TimKiemDanhSach) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/HopThuCaNhan/GetDanhSachHopThuCaNhan',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}
