import { LoaiVanBan } from './../../../../models/danh-muc/loai-van-ban';
import { LoaiVanBanService } from './../../../service/danh-muc/loai-van-ban/loai-van-ban.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { SearchTheoMa } from 'src/app/models/danh-muc/search.model';

@Component({
  selector: 'app-loai-van-ban',
  templateUrl: './loai-van-ban.component.html',
  styleUrls: ['./loai-van-ban.component.scss'],
  providers: [MessageService]
})
export class LoaiVanBanComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  timKiem: SearchTheoMa = {};
  dataSearch = {
    "keyWord": "",
    "ma": "",
    "phanLoai": 2,
    "timChinhXac": 0
  };
  public timChinhXac: boolean = false;

  danhSachLoaiVanBan: LoaiVanBan[] = [];
  loaiVanBan: LoaiVanBan = {};

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  deleteProductDialog: boolean = false;

  idLoaiVanBan: string = '1';
  idLoaiVanBanXoa: any;

  msgs: Message[] = [];
  constructor(private messageService: MessageService, private loaiVanBanService: LoaiVanBanService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị loại văn bản' });
    this.DanhSachLoaiVanBan();
  }

  DanhSachLoaiVanBan() {
    this.loaiVanBanService.getDanhSachLoaiVanBan(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.danhSachLoaiVanBan = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  TimKiemLoaiVanBan() {
    this.dataSearch.keyWord = this.timKiem.keyWord ?? "";
    this.dataSearch.ma = this.timKiem.ma ?? "";
    this.dataSearch.phanLoai = this.timKiem.phanLoai ?? 2;
    this.dataSearch.timChinhXac = this.timChinhXac ? 1 : 0;
    this.DanhSachLoaiVanBan();
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhatLoaiVanBan(id: string) {
    this.hienThiCapNhat = true;
    this.idLoaiVanBan = id;
  }

  tatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } else {
      this.hienThiCapNhat = false;
    }
    this.DanhSachLoaiVanBan();
  }

  XoaLoaiVanBan(id: any) {
    this.deleteProductDialog = true;
    this.idLoaiVanBanXoa = id;
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idLoaiVanBanXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.loaiVanBanService.xoaLoaiVanBan(this.idLoaiVanBanXoa).subscribe(data => {
      this.DanhSachLoaiVanBan();
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
      }
    });
  }
}

