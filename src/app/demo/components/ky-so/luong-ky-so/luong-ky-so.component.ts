import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

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

  hienThiThemMoi: boolean = false;

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Ký số' });
    this.breadcrumbItems.push({ label: 'Luồng ký số' });
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } 
    // else if (type === 'I') {
    //   this.hienThiChiTiet = false;
    // } else if (type === 'U') {
    //   this.hienThiCapNhat = false;
    // }
    // this.TimKiem();
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }
}
