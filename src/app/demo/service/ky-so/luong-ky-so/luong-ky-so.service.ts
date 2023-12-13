import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LuongKySoService {

  constructor(private http: HttpClient) { }

  url = '/KySo/LuongKySo/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public danhSachNhomQuyen(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetNhomQuyen`)
    .pipe(map((res:any) => res.objData));
  }

  public themMoi(luongKySo: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `ThemMoi`, luongKySo, this.httpOptions)
  }
}
