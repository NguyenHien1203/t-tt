import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChucDanh } from 'src/app/models/danh-muc/chuc-danh';

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

  public getListTitles(titles: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachChucDanh', titles, this.httpOptions)
      .pipe(
        map((res: any) => res.objData as ChucDanh[])
      )
  } 

  public getIdTitle(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetChucDanhById/${id}`)
      .pipe(
        map((response: any) => response.objData as ChucDanh[])
      );
  }

  public createTitle(title: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiChucDanh', title, this.httpOptions)
  }

  public updateTitle(title: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatChucDanh?id=${id}`, title, this.httpOptions)
  }
  
  public deleteTitle(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteChucDanh/${id}`, this.httpOptions)
  }
}
