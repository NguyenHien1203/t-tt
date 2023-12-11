import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemDanhSach } from 'src/app/models/cong-viec/qly-cviec-psinh';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QlyCviecPsinhService {
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


  public GetDanhSachCongViec(modelTimKiem: TimKiemDanhSach) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    modelTimKiem.idUser = this.auth.GetmUserInfo().userId.toString();
    console.log(modelTimKiem);
    const url = `${this.baseUrl}/CongViec/QuanLyCongViecPhatSinh/GetDanhSachCongViec/`;
    
    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

  public ThemMoiCongViec(modelCongViec: any) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/CongViec/QuanLyCongViecPhatSinh/ThemMoiCVPhatSinh', modelCongViec, this.httpOption)
  }

  public LoadDataDefault(idCongViec: string) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    var IdDonVi = this.auth.GetmUserInfo().donViId.toString();
    const url = `${this.baseUrl}/CongViec/QuanLyCongViecPhatSinh/GetDanhSachCongViec?idCongViec=` + idCongViec + "&idDonVi=" + IdDonVi;
    return this.httpClient.get<any>(url);
  }

  public ThemCongViecCon(modelCongViec: any) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/CongViec/QuanLyCongViecPhatSinh/ThemCongViecCon', modelCongViec, this.httpOption)
  }


  public GetDataUpdateCongViec(item: any) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);

    const url = `${this.baseUrl}/CongViec/QuanLyCongViecPhatSinh/GetDataUpdateCongViec?idUserCvChiTieu=` + item.id.toString() + "&idCongViec=" + item.congViecId + "&stt=" + item.stt;
    return this.httpClient.get<any>(url);
  }

  public CapNhatCongViec(modelVanban: any) {
    if (!this.auth.CheckLogin())
      this.router.navigate(['/login']);
    return this.httpClient.post<any>(environment.baseUrlApi + '/CongViec/QuanLyCongViecPhatSinh/CapNhatCongViec', modelVanban, this.httpOption)
  }


}
