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
    const url = `${this.baseUrl}/VanBanDen/ButPheVanBan/GetDanhSachButPhe/`;
    return this.httpClient.post<any>(url, modelTimKiem, this.httpOption);
  }

}
