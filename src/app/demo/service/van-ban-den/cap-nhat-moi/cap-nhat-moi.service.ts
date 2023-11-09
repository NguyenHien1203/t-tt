import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/cap-nhat-moi';

@Injectable({
    providedIn: 'root'
})

export class CapNhatMoiService {
    private baseUrl = environment.baseUrlApi;
    private httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    constructor(
        private httpClient: HttpClient,
        private auth: AuthService,
        private router: Router

    ) { }

    /**
    * Lấy dữ liệu danh sách sổ văn bản
    */
    public GetDataSoVanBan(): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataSoVanBan?IdDonViLamViec=` + DviLamViec;
        return this.httpClient.get<any>(url);
    }

    /**
    * Lấy dữ liệu danh sách loại văn bản theo sổ văn bản
    */
    public GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan: string): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);

        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataLoaiVanBanByIdSoVanBan?IdSoVanBan=` + IdSoVanBan;
        return this.httpClient.get<any>(url);
    }

    /**
    * Lấy dữ liệu danh sách cơ quan ban hành
    */
    public GetDataCoQuanBanHanh(): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);

        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataCoQuanBanHanh`;
        return this.httpClient.get<any>(url);
    }

    /**
     * getDanhSachCapNhatMoi
     */
    public getDanhSachCapNhatMoi(modelTimKiem: TimKiemDanhSach) {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDanhSachCapNhatMoi/`;
        modelTimKiem.DonViLamViec = DviLamViec;
        return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
    }

    /**
    * Check xem đã phân phối chưa
    */
    public GetPhanPhoi(idvb: number): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/CheckVanBanPhanPhoi?IDVB=` + idvb + "&IDDonViLamViec=" + DviLamViec;
        return this.httpClient.get<any>(url);
    }

    /**
     * Thêm mới văn bản
     */
    public ThemMoiVanBan(modelVanban: any): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        return this.httpClient.post<any>(environment.baseUrlApi + '/VanBanDen/CapNhatMoiVanBanDen/ThemMoiVanBanDen', modelVanban, this.httpOption)
    }

    /**
     * Xóa tài khoản
     */
    public DeleteVanBan(IdVanBan: string): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        const DonViLamViec = this.auth.GetDonViLamViec();
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/XoaVanBanDen?IdVanBan=` + IdVanBan + "&DonViLamViec=" + DonViLamViec;
        return this.httpClient.post<any>(url, this.httpOption)
    }

    /**
     * Lấy thông tin văn bản nhận gửi
     */
    public GetVanBanNhanGuiById(IdvanBan: string): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec()
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetVanBanNhanGuiById?idVanBan=` + IdvanBan + "&DonViLamViec=" + DviLamViec;
        return this.httpClient.get<any>(url);
    }

    /**
     * DownloadFile
     */
    public DownloadFile(filepath: string) {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);

        const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
        return this.httpClient.get(environment.baseUrlApi + '/VanBanDen/CapNhatMoiVanBanDen/DownloadFile?filepath=' + filepath, {
            headers,
            responseType: 'blob', // Xác định responseType là 'blob'.
        });
    }

    /**
    * Lấy dữ liệu danh sách phòng ban
    */
    public GetDataPhongBan(): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var Username = this.auth.GetmUserInfo().userName.toString();
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataPhongBan?Username=` + Username;
        return this.httpClient.get<any>(url);
    }

    /**
   * Lấy dữ liệu nhóm người dùng
   */
    public GetDataNhomNguoiDung(): Observable<any> {
        if (!this.auth.CheckLogin())
            this.router.navigate(['/login']);
        var DviLamViec = this.auth.GetDonViLamViec();
        var UserId = this.auth.GetmUserInfo().userId.toString();
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/GetDataNhomNguoiDung?DonViLamViec=` + DviLamViec + "&UserId=" + UserId;
        return this.httpClient.get<any>(url);
    }

    
    public changePhongBan(phongBanId: string) {
        return this.httpClient.get<any>(environment.baseUrlApi + '/VanBanDen/CapNhatMoiVanBanDen/ChangePhongBan/' + phongBanId)
            .toPromise()
            .then(data => data.objData)
    }

    public changeNhomNguoiDung(nhomNguoiDungId: string) {
        return this.httpClient.get<any>(environment.baseUrlApi + '/VanBanDen/CapNhatMoiVanBanDen/BindUserByNhomNguoiDung/' + nhomNguoiDungId)
            .toPromise()
            .then(data => data.objData)
    }

    /**
     * PhanPhoiVanBan
     */
    public PhanPhoiVanBan(itemData : any) {
        if (!this.auth.CheckLogin())
        this.router.navigate(['/login']);
        const url = `${this.baseUrl}/VanBanDen/CapNhatMoiVanBanDen/PhanPhoiVanBanDen`;
        return this.httpClient.post<any>(url, itemData, this.httpOption);
    }

}