import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrinhKyVanBanService {

  constructor(private http: HttpClient) { }

  url = '/KySo/TrinhKyVanBan/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post(`${environment.baseUrlApi}` + this.url + 'GetDanhSach', danhSach)
    .pipe(map((res: any) => res.objData))
  }

  public getTrinhKy(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrlApi}` + this.url + `GetTrinhKy/${id}`, this.httpOptions)
    .pipe(map((res: any) => res.objData))
  }

  public danhSachLuongKySo(donViId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLuongKySo?donViId=${donViId}`)
    .pipe(map((res: any) => res.objData))
  }
  
  public danhSachLoaiVanBan(donViId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLoaiVanBan?donViId=${donViId}`)
    .pipe(map((res: any) => res.objData))
  }
  
  public danhSachVanBanTraLoi(donViId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetVanBanTraLoi?donViId=${donViId}`)
    .pipe(map((res: any) => res.objData))
  }
  
  public danhSachLanhDaoKy(donViId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetLanhDaoKy?donViId=${donViId}`)
    .pipe(map((res: any) => res.objData))
  }
  
  public danhSachNguoiNhan(donViId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetNguoiNhan?donViId=${donViId}`)
    .pipe(map((res: any) => res.objData))
  }

  public themMoi(trinhKy: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoi', trinhKy, this.httpOptions);
  }

  public xoa(id: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `Xoa/${id}`, this.httpOptions);
  }

  public capNhat(trinhKy: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhat/${id}`, trinhKy, this.httpOptions);
  }
}
