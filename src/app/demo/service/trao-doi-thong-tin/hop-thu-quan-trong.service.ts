import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/hop-thu-quan-trong';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HopThuQuanTrongService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachHopThuQuanTrong(timKiemDanhSach: TimKiemDanhSach) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/TraoDoiThongTin/HopThuQuanTrong/GetDanhSachHopThuQuanTrong',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData as any[]);
}
}
