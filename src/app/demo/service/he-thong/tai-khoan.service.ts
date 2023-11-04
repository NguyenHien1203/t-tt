import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonViThucHien, TaiKhoan, TaiKhoanTimKiem } from 'src/app/models/he-thong/tai-khoan';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { AuthService } from '../../../common/auth.services';
import { map } from 'rxjs/operators';
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
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    /**
     * Lấy dữ liệu danh sách tài khoản
     */
    public GetDanhSachTaiKhoan(timkiem: TaiKhoanTimKiem): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDanhSachNguoiDung`;
        return this.httpClient.post<TaiKhoanTimKiem>(url, timkiem, this.httpOption);
    }

    /**
     * Lấy dữ liệu đơn vị tree
     */
    public GetDataDonVi(): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDataDonVi`;
        return this.httpClient.get(url);
    }

    /**
     * lấy dữ liệu phòng ban theo đơn vị đã chọn
     * 
     */
    public GetDataPhongBanByDvi(id: string): Observable<any> {
        const url = this.baseUrl + '/NguoiDung/GetDataPhongBanByDvi?id=' + id;
        return this.httpClient.get<any>(url);
    }

    /**
     * lấy dữ liệu phòng ban theo đơn vị đã chọn
     * 
     */
    public GetDataMenu(UserId: string, NhomQuyenId: string, PhongBanId: string): Observable<any> {
        const url = this.baseUrl + '/Membership/Membership/GetDataMenu?Userid=' + UserId + "&NhomQuyenId=" + NhomQuyenId + "&PhongBanId=" + PhongBanId;
        return this.httpClient.get<any>(url);
    }

    /**
     * Lấy dữ liệu nhóm quyền
     */
    public GetNhomQuyen(): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDataNhomQuyen`;
        return this.httpClient.get<any>(url);
    }

    /**
     * Lấy dữ liệu chức danh
     */
    public GetChucDanh(): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDataChucDanh`;
        return this.httpClient.get<any>(url);
    }

    /**
     * GetDataNhomQuyen
     */
    public GetDataNhomQuyenMenu(): Observable<any> {
        const objUser = this.authService.GetmUserInfo();
        const data = {
            idPhongBan: objUser.phongBanLamViecId.toString(),
            idNhomQuyen: objUser.nhomQuyenId.toString()
        };

        const url = `${this.baseUrl}/NguoiDung/GetDataNhomQuyenMenu`;
        return this.httpClient.post<any>(url, data, this.httpOption);
    }


    /**
     * GetDataNhomQuyen
     */
    public GetOptionNhomQuyen(): Observable<any> {
        const objUser = this.authService.GetmUserInfo();
        const url = `${this.baseUrl}/NguoiDung/GetOptionNhomQuyen?UserId=` + objUser.userId.toString();
        return this.httpClient.get<any>(url);
    }

    /**
     * Lấy dữ liệu đơn vị thực hiện tree
     */
    public GetDataDonViThucHien(IdDonVi: string): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/GetDataDonViThucHien?IdDonVi=` + IdDonVi;
        return this.httpClient.get(url);
    }

    /**
     * Thêm mới tài khoản
     */
    public AddTaiKhoan(User: TaiKhoan, UserDvth: DonViThucHien[]): Observable<any> {
        const objUser = this.authService.GetmUserInfo();
        const data = {
            User: JSON.stringify(User),
            UserDvth: JSON.stringify(UserDvth),
            DonViId: objUser.donViId.toString(),
            IdUser: objUser.userId.toString(),
            UserName: objUser.userName.toString(),
        };
        const url = `${this.baseUrl}/NguoiDung/ThemMoiTaiKhoan`;
        return this.httpClient.post<any>(url, data, this.httpOption);
    }

    /**
     * Xóa tài khoản
     */
    public DeleteTaiKhoan(idUser: string): Observable<any> {
        const url = `${this.baseUrl}/NguoiDung/DeleteTaiKhoan?idUser=` + idUser;
        return this.httpClient.post<any>(url, this.httpOption)
    }

    /**
     * lấy dữ liệu bản ghi cần cập nhật
     */
    public GetDataByIdTaiKhoan(id: string) {
        return this.httpClient.get<any>(environment.baseUrlApi + '/NguoiDung/GetDataByIdTaiKhoan/' + id)
            .pipe(
                map((response: any) => response.objData)
            );
    }

}
