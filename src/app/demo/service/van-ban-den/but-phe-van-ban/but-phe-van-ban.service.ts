import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/van-ban-den/but-phe-van-ban';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ButPheVanBanService {

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
   * getDanhSachCapNhatMoi
   */
  public getDataButPhe(modelTimKiem: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DviLamViec = this.auth.GetDonViLamViec();
    var PblvId = this.auth.GetmUserInfo().phongBanLamViecId.toString();

    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/GetDanhSachButPhe/`;
    modelTimKiem.DonViLamViec = DviLamViec;
    modelTimKiem.phongbanlamviecid = PblvId;

    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

  /**
    * Lấy thông tin văn bản nhận gửi
    */
  public GetVanBanById(IdvanBan: string): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/GetVanBanById?idVanBan=` + IdvanBan;
    return this.httpClient.get<any>(url);
  }

  /**
      * Lấy dữ liệu danh sách phòng ban
      */
  public LoadPhongBan(): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var DviLamViec = this.auth.GetDonViLamViec();
    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/LoadPhongBan?IDDonViLamViec=` + DviLamViec;
    return this.httpClient.get<any>(url);
  }

  /**
        * Lấy dữ liệu danh sách nhóm người dùng
        */
  public LoadNhomNguoiDung(): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    var IdUser = this.auth.GetmUserInfo().userId.toString();
    var DviLamViec = this.auth.GetDonViLamViec();
    var IdPhongBan = this.auth.GetmUserInfo().phongBanLamViecId.toString();

    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/LoadNhomNguoiDung?DonViLamViecId=` + DviLamViec + "&IdPhongBanLamViec=" + IdPhongBan + "&UserId=" + IdUser;
    return this.httpClient.get<any>(url);
  }


  /**
        * Lấy dữ liệu danh sách nhóm người dùng
        */
  public LoadChonNhanhNguoiDung(): Observable<any> {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    var IdUser = this.auth.GetmUserInfo().userId.toString();
    var IdDonVi = this.auth.GetmUserInfo().donViId.toString();

    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/LoadChonNhanhNguoiDung?DonViId=` + IdDonVi + "&UserId=" + IdUser;
    return this.httpClient.get<any>(url);
  }
}
