import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetVanBanTrinhKyService } from 'src/app/demo/service/ky-so/duyet-van-ban-trinh-ky/duyet-van-ban-trinh-ky.service';
import { TimKiemDuyetVBTrinhKy } from 'src/app/models/ky-so/duyet-van-ban-trinh-ky/duyet-van-ban-trinh-ky';

@Component({
  selector: 'app-duyet-van-ban-trinh-ky',
  templateUrl: './duyet-van-ban-trinh-ky.component.html',
  styleUrls: ['./duyet-van-ban-trinh-ky.component.scss'],
  providers: [MessageService]
})
export class DuyetVanBanTrinhKyComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  donViId = this.authService.GetmUserInfo().donViId;

  lstNam: SelectItem[] = [];
  lstThang: SelectItem[] = [];
  lstLoaiVanBan: SelectItem[] = [];
  danhSach: any[] = [];

  timKiem: TimKiemDuyetVBTrinhKy = {
    trichYeu: '',
    donViId: 0,
    nam: 1999,
    thang: 0,
    userIdDuyet: 0,
    loaiVanBanId: 0,
    groupId: 0,
    timChinhXac: 0,
  }
  timChinhXac: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private service: DuyetVanBanTrinhKyService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Ký số' });
    this.breadcrumbItems.push({ label: 'Duyệt văn bản trình ký' });

    this.GetNam();
    this.GetThang();
    this.GetLoaiVanBan();
  }

  GetDanhSach() {
    this.timKiem.timChinhXac = this.timChinhXac ? 1 : 0;
    this.timKiem.userIdDuyet = Number(this.authService.GetmUserInfo().userId);
    this.timKiem.donViId = Number(this.authService.GetmUserInfo().donViId);
    this.timKiem.groupId = Number(this.authService.GetmUserInfo().nhomQuyenId);

    this.service.getDanhSach(this.timKiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.danhSach = data
      };
    }, (error) => {
      console.log('Error', error);
    })
  }

  CheckCX() {
    this.timChinhXac = !this.timChinhXac;
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

  GetLoaiVanBan() {
    this.service.getLoaiVanBan(this.donViId).subscribe(data => {
      this.lstLoaiVanBan = data;
    })
  }
}
