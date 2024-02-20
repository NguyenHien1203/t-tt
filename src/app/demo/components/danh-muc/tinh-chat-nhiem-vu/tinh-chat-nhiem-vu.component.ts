import { TinhChatNhiemVuService } from './../../../service/danh-muc/tinh-chat-nhiem-vu/tinh-chat-nhiem-vu.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { TimKiemTinhChatNV, TinhChatNhiemVu } from 'src/app/models/danh-muc/tinh-chat-nhiem-vu';

@Component({
  selector: 'app-tinh-chat-nhiem-vu',
  templateUrl: './tinh-chat-nhiem-vu.component.html',
  styleUrls: ['./tinh-chat-nhiem-vu.component.scss'],
  providers: [MessageService]
})
export class TinhChatNhiemVuComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  timKiemTinhChatNV: TimKiemTinhChatNV = {
    keyWord: "",
    nam: 0
  }

  danhSachTinhChat: TinhChatNhiemVu[] = [];
  tinhChat: TinhChatNhiemVu = {};

  valCheck: String[] = [];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  idTinhChat: string = '1';
  idXoa: any;

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị tính chất nhiệm vụ' });
    this.DanhSachTinhChat();
  }

  constructor(private messageService: MessageService, private tinhChatNhiemService: TinhChatNhiemVuService) { }

  DanhSachTinhChat() {
    this.tinhChatNhiemService.getDanhSachTinhChatNhiemVU(this.timKiemTinhChatNV)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.danhSachTinhChat = data;
        }
      }, (error) => {
        console.log("Error:" + error);
      })
  }

  TimKiem() {
    this.timKiemTinhChatNV.keyWord = this.timKiemTinhChatNV.keyWord ?? "";
    this.DanhSachTinhChat();
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhat(id: string) {
    this.hienThiCapNhat = true;
    this.idTinhChat = id;
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } else {
      this.hienThiCapNhat = false;
    }
    this.DanhSachTinhChat();
  }

  Xoa(id: any) {
    this.deleteProductDialog = true;
    this.idXoa = id;
  }

  DungXoa() {
    this.deleteProductDialog = false;
    this.idXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.tinhChatNhiemService.xoaTinhChatNhiemVu(this.idXoa).subscribe(data => {
      this.DanhSachTinhChat();
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
      }
    });
  }

}
