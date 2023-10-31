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

  public getListFields(fields: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachChucDanh', fields, this.httpOptions)
      .pipe(
        map((res: any) => res.objData as ChucDanh[])
      )
  }

  public getIdField(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetChucDanhById/${id}`)
      .pipe(
        map((response: any) => response.objData as ChucDanh[])
      );
  }

  public createField(field: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiChucDanh', field, this.httpOptions)
  }

  public updateField(field: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhatChucDanh?id=${id}`, field, this.httpOptions)
  }
  
  public deleteField(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `DeleteChucDanh/${id}`, this.httpOptions)
  }
}
