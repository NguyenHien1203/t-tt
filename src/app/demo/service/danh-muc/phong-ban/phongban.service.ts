import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { Observable, ObservedValueOf } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhongbanService {
baseApiUrl: string ="https://localhost:7077/api";
private httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

  constructor(private http: HttpClient) { }

  getDanhSachPhongBan(timkiem: TimKiemModel){
    return this.http.post<any>(this.baseApiUrl+'/DanhMuc/PhongBan/GetDanhSachPhongBan/', timkiem, this.httpOption).toPromise().then(response => response.objData.listPhongBan as DmPhongBan[])
  }
}
