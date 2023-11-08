import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaiVanBan } from 'src/app/models/danh-muc/loai-van-ban';

@Injectable({
  providedIn: 'root'
})
export class LoaiVanBanService {

  url = '/DanhMuc/LoaiVanBan/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getLoaiVanBan(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLoaiVanBanById/${id}`)
      .pipe(
        map((response: any) => response.objData as LoaiVanBan[])
      );
  }

  public getDanhSachLoaiVanBan(timKiem: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachLoaiVanBan', timKiem, this.httpOptions)
      .pipe(
        map((res: any) => res.objData as LoaiVanBan[])
      )
  }

  public themMoiLoaiVanBan(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiLoaiVanBan', danhSach, this.httpOptions)
  }

  public capNhatLoaiVanBan(danhSach: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatLoaiVanBan/${id}`, danhSach, this.httpOptions)
  }

  public xoaLoaiVanBan(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteLoaiVanBan/${id}`, this.httpOptions)
  }
}
