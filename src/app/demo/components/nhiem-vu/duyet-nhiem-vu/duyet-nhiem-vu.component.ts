import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetNhiemVuService } from 'src/app/demo/service/nhiem-vu/duyet-nhiem-vu.service';
import { TimKiemDuyetNhiemVu } from 'src/app/models/nhiem-vu/duyet-nhiem-vu';

@Component({
  selector: 'app-duyet-nhiem-vu',
  templateUrl: './duyet-nhiem-vu.component.html',
  styleUrls: ['./duyet-nhiem-vu.component.scss'],
  providers: [MessageService]
})
export class DuyetNhiemVuComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  donViId = this.authService.GetmUserInfo().donViId;

  timKiem: TimKiemDuyetNhiemVu = {
    soKiHieuNgayVanBan: "",
    tenNhiemVu: "",
    trangThai: 0,
    phongBanId: 0,
    donvilamviecid: "",
    iTimChinhXac: 0,
  }
  timChinhXac: boolean = false;

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;

  lstLoaiVanBan: any[] = [];
  danhSachs: any[] = [];

  lstHienThi: SelectItem[] = [
    { label: 'Chọn trạng thái', value: 0 },
    { label: 'Chờ xử lý', value: 1 },
    { label: 'Đã duyệt', value: 2 },
    { label: 'Đang xử lý', value: 7 },
    { label: 'Từ chói duyệt', value: 5 },
  ];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private service: DuyetNhiemVuService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Nhiệm vụ' });
    this.breadcrumbItems.push({ label: 'Duyệt nhiệm vụ' });

    this.TimKiem();

    // console.log(this.authService.GetmUserInfo());
    // console.log(this.authService.GetDonViLamViec());
  }

  CheckCX() {
    this.timChinhXac = !this.timChinhXac;
  }

  TimKiem() {
    this.timKiem.iTimChinhXac = this.timChinhXac ? 1 : 0;
    this.timKiem.phongBanId = Number(this.authService.GetmUserInfo().phongBanLamViecId);
    this.timKiem.donvilamviecid = this.authService.GetmUserInfo().phongBanLamViecId;
    this.service.getDanhSach(this.timKiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.danhSachs = data;
        this.danhSachs.forEach((item) => {
          switch (item.tienDo) {
            case 1: {
              item.trangThai = "Chờ xử lý";
              break;
            }
            case 2: {
              item.trangThai = "Đã duyệt";
              break;
            }
            case 5: {
              item.trangThai = "Từ chối duyệt";
              break;
            }
            case 7: {
              item.trangThai = "Đang xử lý";
              break;
            }
          }
        });
        console.log(this.danhSachs);
      };
    }, (error) => {
      console.log('Error', error);
    })
  }
}
