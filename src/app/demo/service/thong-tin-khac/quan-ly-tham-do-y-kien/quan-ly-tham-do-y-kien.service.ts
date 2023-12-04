import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CauTraLoiThamDo, QuanLyThamDoYKien } from 'src/app/models/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien';

@Injectable({
  providedIn: 'root'
})
export class QuanLyThamDoYKienService {

  url = '/ThongTinKhac/QuanLyThamDoYKien/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public getDanhSach(danhSach: any): Observable<any> {
    return this.http.post(`${environment.baseUrlApi}` + this.url + 'GetDanhSach', danhSach)
      .pipe(map((res: any) => res.objData as QuanLyThamDoYKien))
  }

  public getDanhSachCauHoi(id: any, idDonVi: any): Observable<any> {
    return this.http.get(`${environment.baseUrlApi}` + this.url + `GetCauTraLoi/${id}` + `?idDonVi=` + idDonVi, idDonVi)
      .pipe(map((res: any) => res.objData as CauTraLoiThamDo))
  }

  public themMoi(cauHoi: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoi', cauHoi, this.httpOptions)
  }

  public themMoiCauTraLoi(cauTraLoi: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + 'ThemMoiCauTraLoi', cauTraLoi, this.httpOptions)
  }

  public xoa(id: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `Xoa/${id}`, this.httpOptions);
  }

  public capNhat(cauHoi: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}` + this.url + `CapNhat/${cauHoi.id}`, cauHoi, this.httpOptions);
  }

  public getThamDoCauHoi(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlApi}` + this.url + `GetThamDoYKien/${id}`)
      .pipe(map((res: any) => res.objData as QuanLyThamDoYKien));
  }
}
