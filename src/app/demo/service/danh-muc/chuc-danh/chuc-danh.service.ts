import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChucDanhService {

  url: string = 'https://localhost:7077/api/DanhMuc/LinhVuc/';

  constructor(private http: HttpClient) { }

  getListFields(fields: any): Observable<any> {
    return this.http.post<any>(this.url + 'GetDanhSachLinhVuc', fields)
      .pipe(
        map((response: any) => response.objData)
      );
  }
}
