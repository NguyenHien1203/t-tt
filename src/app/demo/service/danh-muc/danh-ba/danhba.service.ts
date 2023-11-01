import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DmDanhBa, TimKiemModel } from 'src/app/demo/api/danh-muc/danh-ba';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DanhbaService {

  baseApiUrl: string ="https://localhost:7077/api";

  constructor(private http: HttpClient) { }

  getDanhSachDanhBa(timkiem: TimKiemModel): Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/DanhMuc/Danhba/GetDanhSach/', timkiem)
    .pipe(
      map((response: any) => response.objData)
    );
  }

}

