import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemDanhMucHoSoCaNhan } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DanhMucHoSoCongViecService {
  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachDanhMucHoSoCaNhan(timKiemDanhSach: TimKiemDanhMucHoSoCaNhan) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCaNhan/GetDanhSach',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}

getDanhMucHoSoCaNhanId(id: string) {
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/HoSoCongViec/DanhMucHoSoCaNhan/GetDanhMucHoSoCaNhanById/' +
                id
        )
        .toPromise()
        .then((res) => res.objData);
}

themMoiDanhMucHoSoCaNhan(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/DanhMucHoSoCaNhan/ThemMoiDanhMucHoSoCaNhan',
            itemData,
        this.httpOption
    );
}

capNhatDanhMucHoSoCaNhan(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/DanhMucHoSoCaNhan/CapNhatDanhMucHoSoCaNhan',
            itemData,
        this.httpOption
    );
}

xoaDanhMucHoSoCaNhan(id: string) {
    return this.http.get<any>(
        environment.baseUrlApi +
            '/HoSoCongViec/DanhMucHoSoCaNhan/XoaDanhMucHoSoCaNhan/' +
            id
    );
}
}
