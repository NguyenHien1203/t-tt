import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SoVanBan } from 'src/app/models/danh-muc/so-van-ban';


@Injectable({
  providedIn: 'root'
})
export class SoVanBanService {

  url = '/DanhMuc/SoVanBan/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getSoVanBan(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetSoVanBanById/${id}`)
      .pipe(
        map((response: any) => response.objData as SoVanBan[])
      );
  }

  public getDanhSachSoVanBan(timKiem: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachSoVanBan', timKiem, this.httpOptions)
    .pipe(
      map((res: any) => res.objData as SoVanBan[])
    )
  }

  public themMoiSoVanBan(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiSoVanBan', danhSach, this.httpOptions)
  }

  public capNhatSoVanBan(danhSach: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatSoVanBan/${id}`, danhSach, this.httpOptions)
  }

  public xoaSoVanBan(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteSoVanBan/${id}`, this.httpOptions)
  }
}
