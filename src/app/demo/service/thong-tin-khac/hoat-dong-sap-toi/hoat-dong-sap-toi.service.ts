import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoatDongSapToiService {

  constructor(private http: HttpClient) { }

  url = '/ThongTinKhac/HoatDongSapToi/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSach', danhSach)
    .pipe(map((res: any) => res.objData));
  }

  public themMoi(hoatDong: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoi', hoatDong, this.httpOptions);
  }

  public xoa(id:any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `Xoa/${id}`, this.httpOptions);
  }
}
