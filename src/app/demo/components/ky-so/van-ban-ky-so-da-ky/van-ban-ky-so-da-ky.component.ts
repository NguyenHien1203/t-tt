import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-van-ban-ky-so-da-ky',
  templateUrl: './van-ban-ky-so-da-ky.component.html',
  styleUrls: ['./van-ban-ky-so-da-ky.component.scss'],
  providers: [MessageService]
})
export class VanBanKySoDaKyComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  donViId = this.authService.GetmUserInfo().donViId;

  lstNam: SelectItem[] = [];
  lstThang: SelectItem[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Ký số' });
    this.breadcrumbItems.push({ label: 'Quản lý văn bản đã ký số' });

    this.GetNam();
    this.GetThang();
  }

  GetNam() {
    this.lstNam.push({ label: 'Chọn năm', value: 0 });
    const year = new Date().getFullYear() + 1;
    for (let i = year; i >= year - 5; i--) {
      this.lstNam.push({ label: 'Năm ' + i.toString(), value: i });
    }
  }

  GetThang() {
    this.lstThang.push({ label: 'Chọn tháng', value: 0 });
    for (let i = 1; i <= 12; i++) {
      this.lstThang.push({
        label: 'Tháng ' + i.toString(),
        value: i,
      });
    }
  }
}
