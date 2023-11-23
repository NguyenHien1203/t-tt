import { QuanTriVanBanDiService } from './../../../service/van-ban-di/quan-tri-van-ban-di/quan-tri-van-ban-di.service';
import { Component, OnInit, Type } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriVanBanDi, TimKiemVBDi } from 'src/app/models/van-ban-di/quan-tri-van-ban-di';
// import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-quan-tri-van-ban-di',
  templateUrl: './quan-tri-van-ban-di.component.html',
  styleUrls: ['./quan-tri-van-ban-di.component.scss'],
  providers: [MessageService]
})
export class QuanTriVanBanDiComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  trangThaiButton: any = "Tìm kiếm nâng cao";
  iconButton: any = "pi pi-arrow-down";

  hienThi: boolean = false;
  luaChonNam: SelectItem[] = [] // Lựa chọn năm
  luaChonThang: SelectItem[] = [] // Lựa chọn tháng
  luaChonTrangThai: SelectItem[] = [] // Lựa chọn trạng thái
  luaChonMucDo: SelectItem[] = [] // Lựa chọn mức độ văn bản
  lstLoaiVanBan: any = [];
  lstSoVanBan: any = [];

  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? "0";
  idDonViLVCha: string = this.authService.GetmUserInfo().donViIdCha ?? "0";
  timChinhXac: boolean = false;
  timKiemDanhSach: TimKiemVBDi = {
    //Row 1
    keyWord: "",
    soKyHieu: "",
    nam: 0,
    thang: 0,
    timChinhXac: 0,
    //Row 2
    ngayBanHanh: "1901-01-01",
    ngayGui: "1901-01-01",
    loaiVanBanId: 0,
    soVanBanId: 0,
    //Row 3
    trichYeu: "",
    trangThai: 0,
    mucDo: 0,
    soDi: 0,

    vanBanId: 0,
    donViId: Number(this.idDonViLamViec),
  }

  danhSachVanBanDi: QuanTriVanBanDi[] = [];
  vanBanDi: QuanTriVanBanDi = {};
  idVanBanDi: string = '1';

  msgs: Message[] = [];
  // hienThiDrop: boolean;

  lstChucNang = [
    { label: 'Cập nhật', icon: 'pi pi-sync', action: 'capNhat' },
    { label: 'Thu hồi', icon: 'pi pi-backward', action: 'thuHoi' },
    { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'layLai' },
    { label: 'Thay thế', icon: 'pi pi-replay', action: 'thayThe' },
  ];

  constructor(private messageService: MessageService, private authService: AuthService, private quanTriVanBanDiService: QuanTriVanBanDiService) { }

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Văn bản đi' });
    this.breadcrumbItems.push({ label: 'Quản trị văn bản đi' });

    // this.hienThiDrop = false;

    this.GetLoaiVanBan();
    this.GetSoVanBan();
    this.GetNam();
    this.GetThang();
    this.GetTrangThai();
    this.GetMucDoVanBan();

    this.TimKiem();
    console.log(this.authService.GetmUserInfo());
    // console.log(this.authService.GetDonViLamViec());
    console.log("idDv page list", this.idDonViLamViec);
    console.log("idDvCha page list", this.idDonViLVCha);
  }

  // Kiểm tra true false tìm chính xác
  public TimChinhXac() {
    this.timChinhXac = !this.timChinhXac;
  }

  // Tìm kiếm danh sách
  TimKiem() {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.quanTriVanBanDiService.danhSachVanBanDi(this.timKiemDanhSach).subscribe(data => {
      console.log("List", data);
      this.danhSachVanBanDi = data;
    })
  }

  // Hiển thị tìm kiếm nâng cao
  HienThiTimKiem() {
    this.hienThi = !this.hienThi;

    if (this.hienThi) {
      this.trangThaiButton = "Thu gọn tìm kiếm";
      this.iconButton = "pi pi-arrow-up";
    } else {
      this.trangThaiButton = "Tìm kiếm nâng cao";
      this.iconButton = "pi pi-arrow-down";
    }
  }

  // Danh sách loại văn bản ở phần tìm kiếm
  GetLoaiVanBan() {
    this.quanTriVanBanDiService.getLoaiVanBan(this.idDonViLamViec)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Không tìm thấy dữ liệu" })
        } else {
          this.lstLoaiVanBan = data;
        }
      }, (error) => {
        console.log('Error', error);
      })
  }

  // Danh sách sổ văn bản ở phần tìm kiếm
  GetSoVanBan() {
    this.quanTriVanBanDiService.getSoVanBan(this.idDonViLamViec)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Không tìm thấy dữ liệu" })
        } else {
          this.lstSoVanBan = data;
        }
      }, (error) => {
        console.log('Error', error);
      })
  }

  // Lấy dữ liệu số năm cho phép lựa chọn
  GetNam() {
    this.luaChonNam.push({ label: "--Chọn năm--", value: 0 });
    const soNam = new Date().getFullYear();
    for (let i = soNam + 1; i >= soNam - 5; i--) {
      this.luaChonNam.push({ label: i.toString(), value: i });
    }
  }

  //Lấy dữ liệu số tháng lựa chọn
  GetThang() {
    this.luaChonThang.push({ label: "--Chọn tháng--", value: 0 });
    const soThang = new Date().getMonth();
    for (let i = 1; i <= soThang + 2; i++) {
      this.luaChonThang.push({ label: "Tháng " + i.toString(), value: i });
    }
  }

  //Tạo dữ liệu trạng thái
  GetTrangThai() {
    this.luaChonTrangThai.push({ label: "--Chọn trạng thái--", value: 0 });
    this.luaChonTrangThai.push({ label: "Chờ phát hành", value: 8 });
    this.luaChonTrangThai.push({ label: "Đã phát hành", value: 1 });
    this.luaChonTrangThai.push({ label: "Đã gửi", value: 2 });
    this.luaChonTrangThai.push({ label: "Thay thế", value: 14 });
    this.luaChonTrangThai.push({ label: "Bị thay thế", value: 15 });
    this.luaChonTrangThai.push({ label: "Cập nhật", value: 17 });
    this.luaChonTrangThai.push({ label: "Lấy lại", value: 18 });
    this.luaChonTrangThai.push({ label: "Thu hồi", value: 21 });
    this.luaChonTrangThai.push({ label: "Bị thu hồi", value: 24 });
    this.luaChonTrangThai.push({ label: "Đang xử lý", value: 10 });
    this.luaChonTrangThai.push({ label: "Đã xử lý", value: 11 });
  }

  //Tạo dữ liệu mức độ văn bản
  GetMucDoVanBan() {
    this.luaChonMucDo.push({ label: "--Chọn mức độ--", value: 0 });
    this.luaChonMucDo.push({ label: "VB thường", value: 1 });
    this.luaChonMucDo.push({ label: "VB khẩn, hỏa tốc", value: 2 });
    this.luaChonMucDo.push({ label: "VB mật", value: 3 });
    this.luaChonMucDo.push({ label: "VB tuyệt mật", value: 4 });
    this.luaChonMucDo.push({ label: "VB tối mật", value: 5 });
  }

  //Chi tiết văn bản
  hienThiChiTiet: boolean = false;

  ChiTietVanBan(id: string) {
    this.hienThiChiTiet = true;
    this.idVanBanDi = id;
  }

  tatPopup(item: any, type: string) {
    if (type === "C") {
      this.hienThiChiTiet = false;
    }
    this.TimKiem();
  }
}
