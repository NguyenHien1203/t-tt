import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {map} from 'rxjs/operators';
import { CapNhatMoi, LoaiVanBan, SoVanBan, TimKiemDanhSach } from 'src/app/models/van-ban-di/cap-nhat-moi';
@Injectable({
  providedIn: 'root'
})
export class CapNhatMoiService {

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient
  ) { }

 getDanhSachVanBanDi(timKiemDanhSach: TimKiemDanhSach) {
    return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetDanhSachVanBanDi', timKiemDanhSach, this.httpOption)
      .toPromise()
      .then(res => res.objData as CapNhatMoi[]);
  }
  GetVanBanById(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetVanBanById/' + id)
      .pipe(
        map((response: any) => response.objData)
      );
  }

  getFile(id: string) {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetFile/' + id, {
      headers,
      responseType: 'blob', // Xác định responseType là 'blob'.
    });
  }

  themMoiVanBanDi(modelThongBao: any) {
    return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/ThemMoiVanBanDi', modelThongBao, this.httpOption)
  }

  capNhatVanBanDi(modelThongBao: any) {
    return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/CapNhatVanBanDi', modelThongBao, this.httpOption)
  }

  xoaVanBanDi(id: string) {
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/DeleteVanBanDi/' + id)
  }

  getSoVanBan(idDonViLamViec : string) {
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetSoVanBan/'+ idDonViLamViec)
      .toPromise()
      .then(data => data.objData as SoVanBan[])
  }

  changeSoVanBan(idSoVanBan: string, idDonViLamViec: string) {
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/ChangeSoVanBan?idSoVanBan=' + idSoVanBan + "&idDonViLamViec=" + idDonViLamViec)
      .toPromise()
      .then(data => data.objData as LoaiVanBan[])
  }

  getSoHienTai(idSoVanBan: string, ngayBanHanh : Date, idSoVanBanUpdate: string, soDiHienTai : string, soDiHienTaiUpDate: string ){
    let itemData = {
      idSoVanBan : idSoVanBan,
      ngayBanHanh : ngayBanHanh,
      idSoVanBanUpdate : idSoVanBanUpdate,
      soDiHienTai : soDiHienTai,
      soDiDenUpdate : soDiHienTaiUpDate
    }
    return this.http.post<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetSoHienTai', itemData, this.httpOption)
    .toPromise()
    .then(data => data.data)
  }

  getSoKiHieu(idSoVanBan : string, loaiVanBanId : string, soHienTai : string ){
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetSoKiHieu?idSoVanBan='+ idSoVanBan + "&loaiVanBanId=" +loaiVanBanId + "&soHienTai=" + soHienTai, this.httpOption)
    .toPromise()
    .then(data => data.data)
  }

  getDanhSachPhongBan(donViId : string, userName : string){
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetDanhSachPhongBan?donViId='+ donViId +"&userName=" +userName, this.httpOption)
    .toPromise()
    .then(data => data.objData)
  }

  getDanhSachLanhDaoKy(idDonViLamViec : string){
    return this.http.get<any>(environment.baseUrlApi + '/VanBanDi/CapNhatMoi/GetDanhSachLanhDaoKy?idDonViLamViec='+ idDonViLamViec, this.httpOption)
    .toPromise()
    .then(data => data.objData)
  }
}
