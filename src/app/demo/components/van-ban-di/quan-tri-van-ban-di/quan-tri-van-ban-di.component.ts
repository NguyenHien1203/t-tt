import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
@Component({
  selector: 'app-quan-tri-van-ban-di',
  templateUrl: './quan-tri-van-ban-di.component.html',
  styleUrls: ['./quan-tri-van-ban-di.component.scss'],
  providers: [MessageService]
})
export class QuanTriVanBanDiComponent {

  breadcrumbItems: MenuItem[] = [];

  trangThaiButton: any = '';
  iconButton: any = '';

  hienThi: boolean = false;
  luaChonNam: SelectItem[] = [] // Lựa chọn năm
  luaChonThang: SelectItem[] = [] // Lựa chọn tháng
  luaChonTrangThai: SelectItem[] = [] // Lựa chọn trạng thái
  luaChonMucDo: SelectItem[] = [] // Lựa chọn mức độ văn bản

  constructor(private messageService: MessageService,private authService: AuthService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Văn bản đi' });
    this.breadcrumbItems.push({ label: 'Quản trị văn bản đi' });

    this.GetNam();
    this.GetThang();
    this.GetTrangThai();
    this.GetMucDoVanBan();

    console.log(this.authService.GetmUserInfo());
    console.log(this.authService.GetDonViLamViec());

  }

  // Hiển thị tìm kiếm nâng cao
  HienThiTimKiem() {
    this.hienThi = !this.hienThi;

    if(this.trangThaiButton) {
      this.trangThaiButton = "Mở rộng"
    } else {
      this.trangThaiButton = "Thu gọn"
    }
  }

  // Lấy dữ liệu số năm cho phép lựa chọn
  GetNam() {
    this.luaChonNam.push({ label: "--Chọn năm--", value: 0});
    const soNam = new Date().getFullYear();
    for (let i = soNam + 1; i >= soNam - 5; i--) {
      this.luaChonNam.push({ label: i.toString(), value: i });
    }
  }

  //Lấy dữ liệu số tháng lựa chọn
  GetThang() {
    this.luaChonThang.push({ label: "--Chọn tháng--", value: 0});
    const soThang = new Date().getMonth();
    for (let i = 1; i <= soThang + 2; i++) {
      this.luaChonThang.push({ label: "Tháng " + i.toString(), value: i });
    }
  }

  //Tạo dữ liệu trạng thái
  GetTrangThai() {
    this.luaChonTrangThai.push({ label: "--Chọn trạng thái--", value: 0});
    this.luaChonTrangThai.push({ label: "Chờ phát hành", value: 8});
    this.luaChonTrangThai.push({ label: "Đã phát hành", value: 1});
    this.luaChonTrangThai.push({ label: "Đã gửi", value: 2});
    this.luaChonTrangThai.push({ label: "Thay thế", value: 14});
    this.luaChonTrangThai.push({ label: "Bị thay thế", value: 15});
    this.luaChonTrangThai.push({ label: "Cập nhật", value: 17});
    this.luaChonTrangThai.push({ label: "Lấy lại", value: 18});
    this.luaChonTrangThai.push({ label: "Thu hồi", value: 21});
    this.luaChonTrangThai.push({ label: "Bị thu hồi", value: 24});
    this.luaChonTrangThai.push({ label: "Đang xử lý", value: 10});
    this.luaChonTrangThai.push({ label: "Đã xử lý", value: 11});
  }

  //Tạo dữ liệu mức độ văn bản
  GetMucDoVanBan() {
    this.luaChonMucDo.push({ label: "--Chọn mức độ--", value: 0});
    this.luaChonMucDo.push({ label: "VB thường", value: 1});
    this.luaChonMucDo.push({ label: "VB khẩn, hỏa tốc", value: 2});
    this.luaChonMucDo.push({ label: "VB mật", value: 3});
    this.luaChonMucDo.push({ label: "VB tuyệt mật", value: 4});
    this.luaChonMucDo.push({ label: "VB tối mật", value: 5});
  }
}
