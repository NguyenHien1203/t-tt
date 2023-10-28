import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaiKhoan, TaiKhoanTimKiem } from 'src/app/models/he-thong/tai-khoan';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaiKhoanService {

    private baseUrl = environment.baseUrlApi;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(private httpClient: HttpClient) { }

    /**
     * Lấy dữ liệu danh sách tài khoản
     */
    public GetDanhSachTaiKhoan(timkiem: TaiKhoanTimKiem): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDanhSachNguoiDung`;
        return this.httpClient.post<TaiKhoanTimKiem>(url, timkiem, this.httpOption);
    }

    public GetDataDonVi(): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDanhSachNguoiDung`;
        return this.httpClient.post<TaiKhoanTimKiem>(url, this.httpOption);
    }
}
