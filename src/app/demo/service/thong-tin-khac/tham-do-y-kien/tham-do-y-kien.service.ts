import { mUserInfo } from './../../../../models/common/mUserInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth.services';

@Injectable({
  providedIn: 'root'
})
export class ThamDoYKienService {
  url = '/ThongTinKhac/ThamDoYKien/'
  idDonVi = this.authService.GetDonViLamViec();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private authService: AuthService,) { }

  public getDanhSachYKien(): Observable<any> {
    return this.http.get(`${environment.baseUrlApi}` + this.url + 'DanhSachYKien' + '?idDonVi=' + this.idDonVi, this.httpOptions)
  }
}
