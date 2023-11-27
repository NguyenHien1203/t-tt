import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimKiemChuyenMucCauHoi } from 'src/app/models/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuanLyChuyenMucCauHoiService {

  private httpOption = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
constructor(private http: HttpClient) {}

getDanhSachQuanLyCauHoiThuongGap(
    timKiemDanhSach: TimKiemChuyenMucCauHoi
) {
    return this.http
        .post<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetDanhSach',
            timKiemDanhSach,
            this.httpOption
        )
        .toPromise()
        .then((res) => res.objData);
}
getCauHoiThuongGapById(id: string) {
    return this.http
        .get<any>(
            environment.baseUrlApi +
                '/ThongTinKhac/QuanLyChuyenMucCauHoi/GetChuyenMucCauHoiById/' +
                id
        )
        .toPromise()
        .then((res) => res.objData);
}

themMoiCauHoiThuongGap(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/ThongTinKhac/QuanLyChuyenMucCauHoi/ThemMoiCauHoiThuongGap',
        itemData,
        this.httpOption
    );
}

capNhatCauHoiThuongGap(itemData: any) {
    return this.http.post<any>(
        environment.baseUrlApi +
            '/ThongTinKhac/QuanLyChuyenMucCauHoi/CapNhatCauHoiThuongGap',
        itemData,
        this.httpOption
    );
}

xoaCauHoiThuongGap(id: string) {
    return this.http.get<any>(
        environment.baseUrlApi +
            '/ThongTinKhac/QuanLyChuyenMucCauHoi/XoaChuyenMucCauHoi/' +
            id
    );
}
}
