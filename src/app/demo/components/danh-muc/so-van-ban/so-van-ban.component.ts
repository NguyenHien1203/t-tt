import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { SoVanBanService } from 'src/app/demo/service/danh-muc/so-van-ban/so-van-ban.service';
import { SearchTheoMa } from 'src/app/models/danh-muc/search.model';
import { SoVanBan } from 'src/app/models/danh-muc/so-van-ban';

@Component({
  selector: 'app-so-van-ban',
  templateUrl: './so-van-ban.component.html',
  styleUrls: ['./so-van-ban.component.scss'],
  providers: [MessageService]
})
export class SoVanBanComponent implements OnInit {

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

  danhSachSoVanBan: SoVanBan[] = [];
  soVanBan: SoVanBan = {};

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  deleteProductDialog: boolean = false;

  idSoVanBan: string = '1';
  idSoVanBanXoa: any;

  msgs: Message[] = [];

  constructor(private soVanBanService: SoVanBanService, private messageService: MessageService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị sổ văn bản' });
    this.DanhSachSoVanBan();
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } else {
      this.hienThiCapNhat = false;
    }
    this.DanhSachSoVanBan();
  }

  TimKiemLoaiVanBan() {
    this.dataSearch.keyWord = this.timKiem.keyWord ?? "";
    this.dataSearch.ma = this.timKiem.ma ?? "";
    this.dataSearch.phanLoai = this.timKiem.phanLoai ?? 2;
    this.dataSearch.timChinhXac = this.timChinhXac ? 1 : 0;
    this.DanhSachSoVanBan();
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhatSoVanBan(id: string) {
    this.hienThiCapNhat = true;
    this.idSoVanBan = id;
  }

  XoaSoVanBan(id: any) {
    this.deleteProductDialog = true;
    this.idSoVanBanXoa = id;
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idSoVanBanXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.soVanBanService.xoaSoVanBan(this.idSoVanBanXoa).subscribe(data => {
      this.DanhSachSoVanBan();
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
      }
    });
  }

  DanhSachSoVanBan() {
    this.soVanBanService.getDanhSachSoVanBan(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.danhSachSoVanBan = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }
}
