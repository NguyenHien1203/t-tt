import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-them-moi-don-vi',
  templateUrl: './them-moi-don-vi.component.html',
  styleUrls: ['./them-moi-don-vi.component.scss']
})
export class ThemMoiDonViComponent {
  constructor(
    // private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dmPhongBanService: PhongbanService,
  ) {
  }


  //Lấy giá trị Hiển thị từ trang chủ truyền vào 
  @Input() hienThi: boolean = false;
  //Trả ra nút đóng popuơ
  @Output() tatPopup = new EventEmitter<boolean>();
  //Check trạng thái hiển thị hoặc không
  checkHt: boolean = false;
 
  //#region Khai báo biến
  //Khai báo biến sử dụng
  DonVi: [];
  submitted = false;
  phongBan: any;

  public formThemMoi = this.formBuilder.group({
    Id: [0, []],
    MaDonVi: ["", [Validators.required]],
    TenDonVi: ["", [Validators.required]],
    Url: ["", []],
    SDT: ["", []],
    Fax: ["", []],
    NgayTruyenThong: [new Date, []],
    DiaChi: ["", []],
    Email: ["", []],
    Website: ["", []],
    GhiChu: ["", []],
    TrangThai: [false, []],
    ParentId: [0, []],
    ThuTu: ["", []],
    Cap: [0, []],
    MaDinhDanh: ["", []],
    TenDonViTrenTruc: ["", []],
    Dbname: ["", []],
    PhanLoai: [0, []],
    IsPhongBan: [0, []],
  });

  productDialog: boolean = false;
  IdDonVi: any;
  Cap: any;
  MaDVPC: any;
  //Khai báo đơn vị tree
  DonViTree: DMJsonModel[] = [];
  selectedDonVi: '';

  //Khai báo đơn vị option

  //Hết 
  //#endregion

  //Check trạng thái hiển thị
  public CheckHienThi(): void {
    this.checkHt = !this.checkHt;
  }

  //Hàm chạy đầu tiên
  ngOnInit(): void {
  }

  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  //Get danh sach don vi
}
