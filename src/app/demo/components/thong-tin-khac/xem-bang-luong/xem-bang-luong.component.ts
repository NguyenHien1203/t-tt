import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XemBangLuongService } from 'src/app/demo/service/thong-tin-khac/xem-bang-luong.service';
import { TimKiemDanhSach } from 'src/app/models/thong-tin-khac/xem-bang-luong';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-xem-bang-luong',
  templateUrl: './xem-bang-luong.component.html',
  styleUrls: ['./xem-bang-luong.component.scss'],
  providers : [MessageService]
})
export class XemBangLuongComponent {
  constructor(private service: XemBangLuongService
    , private messageService: MessageService
    , private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach();
  }

  quanLyBangLuongs: any;
  loading: boolean = false;
  public id: string = "1";
  public hienThiThemMoi: boolean = false;
  public hienThiCapNhat: boolean = false;
  timChinhXac: boolean = false;
  idDonViLamViec: number = Number(this.authService.GetDonViLamViec());
  timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    noiDung: "",
    donViId: this.idDonViLamViec ?? 0,
    timChinhXac: 0
  };
  public home = { icon: 'pi pi-home', routerLink: '/' };
  public items = [{ label: 'Thông tin khác' }, { label: 'Xem bảng lương' }];

  public downloadFile(id : string, fileName : string) {
    this.service.getFile(id).subscribe((data) => {
      if(data)
      {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
        saveAs(blob, fileName);
      }
    });
  }

  public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service.getDanhSachXemBangLuong(this.timKiemDanhSach).then(data => { this.quanLyBangLuongs = data; })
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }
}
