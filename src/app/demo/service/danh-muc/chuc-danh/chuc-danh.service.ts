import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChucDanh } from 'src/app/models/danh-muc/chuc-danh/chuc-danh';

@Injectable({
  providedIn: 'root'
})
export class ChucDanhService {

  url = '/DanhMuc/ChucDanh/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public layCacBanGhi(titles: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachChucDanh', titles, this.httpOptions)
      .pipe(
        map((res: any) => res.objData as ChucDanh[])
      )
  } 

  public layMotBanGhi(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetChucDanhById/${id}`)
      .pipe(
        map((response: any) => response.objData as ChucDanh[])
      );
  }

  public themMoi(title: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiChucDanh', title, this.httpOptions)
  }

  public capNhat(title: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatChucDanh?id=${id}`, title, this.httpOptions)
  }
  
  public xoa(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteChucDanh/${id}`, this.httpOptions)
  }
}
