import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NguoiDungLogin } from 'src/app/models/he-thong/nguoi-dung';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DangNhapService {
  private baseUrl = environment.baseUrlApi;
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  public DangNhap(nguoiDung: NguoiDungLogin): Observable<any>{
    const url = `${this.baseUrl}/Membership/Membership/Login`;
    return this.httpClient.post<NguoiDungLogin>(url, nguoiDung, this.httpOption);
  }
}