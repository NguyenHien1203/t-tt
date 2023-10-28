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

  url = '/DanhMuc/LinhVuc/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getListFields(fields: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'GetDanhSachLinhVuc', fields, this.httpOptions)
      .pipe(
        map((res: any) => res.objData)
      )
  }

  // getListFields(fields: any): Observable<any> {
  //   return this.http.post<any>(this.url + 'GetDanhSachLinhVuc', fields)
  //     .pipe(
  //       map((response: any) => response.objData)
  //     );
  // }
}
