import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';

@Injectable({
  providedIn: 'root'
})
export class DuyetNhiemVuService {
  constructor(private http: HttpClient, private auth: AuthService,) { }

  url = '/NhiemVu/DuyetNhiemVu/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post(`${environment.baseUrlApi}` + this.url + 'GetDanhSachNhiemVu', danhSach)
      .pipe(map((res: any) => res.objData))
  }

  public getNhiemVu(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + 'GetNhiemVu/' + id)
      .pipe(map((res: any) => res.objData))
  }

  public capNhat(nhiemVu: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'CapNhat/' + id, nhiemVu, this.httpOptions)
  }

  public xoa(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'Xoa/' + id, id);
  }

  public getDataDefaultOption(): Observable<any> {
    var donViId = this.auth.GetmUserInfo().donViId.toString();
    var phongBanId = this.auth.GetmUserInfo().phongBanId.toString();
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetDataDefaultOption?DonViId=${donViId}&PhongBanId=${phongBanId}`)
      .pipe(map((res: any) => res.objData))
  }
}
