import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TimKiemCapNhatTienDo } from 'src/app/models/nhiem-vu/cap-nhat-tien-do';

@Component({
  selector: 'app-cap-nhat-tien-do',
  templateUrl: './cap-nhat-tien-do.component.html',
  styleUrls: ['./cap-nhat-tien-do.component.scss'],
  providers: [MessageService]
})
export class CapNhatTienDoComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  donViId = this.authService.GetmUserInfo().donViId;

  timKiem: TimKiemCapNhatTienDo = {
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

  lstHienThi: SelectItem[] = [
    { label: 'Tất cả', value: 7 },
    { label: 'Chưa xử lý', value: 1 },
    { label: 'Không có thời hạn', value: 2 },
    { label: 'Hoàn thành đúng hạn', value: 3 },
    { label: 'Hoàn thành quá hạn', value: 4 },
    { label: 'Đang thực hiện đúng hạn', value: 5 },
    { label: 'Đang thực hiện quá hạn', value: 6 },
  ];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Nhiệm vụ' });
    this.breadcrumbItems.push({ label: 'Cập nhật tiến độ' });
  }

  CheckCX() {
    this.timChinhXac = !this.timChinhXac;
  }
}
