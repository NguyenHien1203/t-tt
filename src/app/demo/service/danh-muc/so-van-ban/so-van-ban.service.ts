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

  public getDanhSachSoVanBan(timKiem: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachSoVanBan', timKiem, this.httpOptions)
    .pipe(
      map((res: any) => res.objData as SoVanBan[])
    )
  }

  public xoaSoVanBan(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteSoVanBan/${id}`, this.httpOptions)
  }
}
