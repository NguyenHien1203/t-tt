import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemQuanLyHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-co-quan';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoCoQuanService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachHoSoCaNhan(timKiemDanhSach: TimKiemQuanLyHoSoCoQuan) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/GetDanhSach',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}
getHoSoCaNhanId(id: string) {
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/QuanLyHoSoCaNhan/GetHoSoCaNhanById/' +
                id
        )
        .toPromise()
        .then((data) => data.objData);
}

themMoiHoSoCaNhan(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/QuanLyHoSoCaNhan/ThemMoiHoSoCaNhan',
        itemData,
        this.httpOption
    );
}

capNhatHoSoCaNhan(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/QuanLyHoSoCaNhan/CapNhatHoSoCaNhan',
        itemData,
        this.httpOption
    );
}

xoaHoSoCaNhan(id: string) {
    return this.http.get<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/QuanLyHoSoCaNhan/XoaHoSoCaNhan/' +
            id
    );
}
}
