import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { LienKet } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import {TimKiemDanhSach } from 'src/app/models/danh-muc/lien-ket/lien-ket';
@Injectable({
  providedIn: 'root'
})
export class LienKetService {
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getDanhSachDmLienKet(timKiemDanhSach : TimKiemDanhSach) {
    return this.http.post<any>(environment.baseUrlApi +'/DanhMuc/DanhMucLienKet/GetDanhSach', timKiemDanhSach, this.httpOption)
        .toPromise()
        .then(res => res.objData.listDanhSach as LienKet[]);
}
}
