import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TrinhKyVanBanService } from 'src/app/demo/service/ky-so/trinh-ky-van-ban/trinh-ky-van-ban.service';
import { TimKiemTrinhKy } from 'src/app/models/ky-so/trinh-ky-van-ban/trinh-ky-van-ban';

@Component({
  selector: 'app-trinh-ky-van-ban',
  templateUrl: './trinh-ky-van-ban.component.html',
  styleUrls: ['./trinh-ky-van-ban.component.scss'],
  providers: [MessageService]
})
export class TrinhKyVanBanComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  donViId = this.authService.GetmUserInfo().donViId;

  timKiem: TimKiemTrinhKy = {
    trichYeu: '',
    donViId: 0,
    timChinhXac: 0,
    tuNgay: "1901-01-01",
    denNgay: "2100-01-01",
    phongBanLamViecId: 0,
    userId: 0,
    loaiVanBanId: 0,
  }
  timChinhXac: boolean = false;

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  lstLoaiVanBan: any[] = [];
  danhSachs: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private trinhKyVanBanService: TrinhKyVanBanService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Ký số' });
    this.breadcrumbItems.push({ label: 'Trình ký văn bản' });

    this.GetLoaiVanBan();
    this.GetDanhSach()

    console.log(this.authService.GetmUserInfo());
    console.log(this.authService.GetDonViLamViec());
  }

  CheckCX() {
    this.timChinhXac = !this.timChinhXac;
  }

  GetDanhSach() {
    this.timKiem.timChinhXac = this.timChinhXac ? 1 : 0;
    this.timKiem.userId = Number(this.authService.GetmUserInfo().userId);
    this.timKiem.donViId = Number(this.authService.GetmUserInfo().donViId);
    this.timKiem.phongBanLamViecId = Number(this.authService.GetmUserInfo().phongBanLamViecId);

    this.trinhKyVanBanService.getDanhSach(this.timKiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.danhSachs = data
      };
    }, (error) => {
      console.log('Error', error);
    })
  }

  GetLoaiVanBan() {
    this.trinhKyVanBanService.danhSachLoaiVanBan(this.donViId).subscribe(data => {
      this.lstLoaiVanBan = data;
    })
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    }
    else if (type === 'U') {
      this.hienThiCapNhat = false;
    }
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }
}
