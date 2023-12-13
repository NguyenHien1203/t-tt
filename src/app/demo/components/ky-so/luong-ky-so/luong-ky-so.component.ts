import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LuongKySoService } from 'src/app/demo/service/ky-so/luong-ky-so/luong-ky-so.service';
import { TimKiemLuongKySo } from 'src/app/models/ky-so/luong-ky-so/luong-ky-so';

@Component({
  selector: 'app-luong-ky-so',
  templateUrl: './luong-ky-so.component.html',
  styleUrls: ['./luong-ky-so.component.scss'],
  providers: [MessageService]
})
export class LuongKySoComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  hienThiChiTiet: boolean = false;

  timKiem: TimKiemLuongKySo = {
    keyWord: '',
    donViId: 0,
    timChinhXac: 0,
  }
  timChinhXac: boolean = false;
  danhSachs: any[] = [];
  idXoa: any;
  idCapNhat: any;
  idChiTiet: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private luongKySoService: LuongKySoService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Ký số' });
    this.breadcrumbItems.push({ label: 'Luồng ký số' });

    this.GetDanhSach()
  }

  CheckCX() {
    this.timChinhXac = !this.timChinhXac;
  }

  GetDanhSach() {
    this.timKiem.donViId = Number(this.authService.GetDonViLamViec());
    this.timKiem.timChinhXac = this.timChinhXac ? 1 : 0;
    this.luongKySoService.danhSachLuongKySo(this.timKiem)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.danhSachs = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    }
    else if (type === 'I') {
      this.hienThiChiTiet = false;
    }
    else if (type === 'U') {
      this.hienThiCapNhat = false;
    }
    this.GetDanhSach();
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhat(id: any) {
    this.hienThiCapNhat = true;
    this.idCapNhat = id;
  }

  ChiTiet(id: any) {
    this.hienThiChiTiet = true;
    this.idChiTiet = id;
  }

  Xoa(id: any) {
    this.deleteProductDialog = true;
    this.idXoa = id;
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.luongKySoService.xoa(this.idXoa).subscribe(
      data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.GetDanhSach();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      }
    )
  }


}
