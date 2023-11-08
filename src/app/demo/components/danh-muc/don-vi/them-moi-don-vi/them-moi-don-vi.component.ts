import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DonViService } from 'src/app/demo/service/danh-muc/don-vi/don-vi.service';
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
    private dmDonViService: DonViService,
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
  formThemMoi_fomat: any;

  public formThemMoi = this.formBuilder.group({
    Id: [0, []],
    MaDonVi: ["", [Validators.required]],
    TenDonVi: ["", [Validators.required]],
    Url: ["", []],
    SDT: ["", [Validators.pattern(/^\d{10}$/)]],
    Fax: ["", []],
    NgayTruyenThong: [new Date, []],
    DiaChi: ["", []],
    Email: ["", []],
    Website: ["", []],
    GhiChu: ["", []],
    TrangThai: [false, []],
    ParentId: [0, [Validators.required]],
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
 
  //#endregion

  //Check trạng thái hiển thị
  public CheckHienThi(): void {
    this.checkHt = !this.checkHt;
  }

  //Hàm chạy đầu tiên
  ngOnInit(): void {
    this.GetDataDonVi();
  }

  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  //Get danh sach don vi
  public GetDataDonVi() {
    this.dmDonViService.GetDataDonVi().subscribe(data => {
      console.log(data.objData)
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonVi = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }
  //Hết 

  //#region Thêm mới
  //Thêm mới 
   public ThemMoiDonVi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.formThemMoi_fomat = this.formThemMoi.value;
      this.formThemMoi.value.ParentId = this.formThemMoi_fomat.ParentId.Id;
      this.formThemMoi.value.MaDonVi = this.formThemMoi_fomat.MaDonVi;
      this.formThemMoi.value.MaDinhDanh = this.formThemMoi_fomat.MaDinhDanh;
      this.formThemMoi.value.TenDonViTrenTruc = this.formThemMoi_fomat.TenDonViTrenTruc;
      this.formThemMoi.value.DiaChi = this.formThemMoi_fomat.DiaChi;
      this.formThemMoi.value.SDT = this.formThemMoi_fomat.SDT;
      this.formThemMoi.value.Fax = this.formThemMoi_fomat.Fax;
      this.formThemMoi.value.NgayTruyenThong = this.formThemMoi_fomat.NgayTruyenThong;
      this.formThemMoi.value.Email = this.formThemMoi_fomat.Email;
      this.formThemMoi.value.Website = this.formThemMoi_fomat.Website;
      this.formThemMoi.value.GhiChu = this.formThemMoi_fomat.GhiChu;
      this.formThemMoi.value.Url = this.formThemMoi_fomat.url;
      this.formThemMoi.value.ThuTu = this.formThemMoi_fomat.ThuTu;
      this.formThemMoi.value.TrangThai = this.formThemMoi_fomat.TrangThai;

      console.log(this.formThemMoi.value)
      // this.dmDonViService.addDonVi(this.formThemMoi).subscribe(data => {
      //   if (data.isError) {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      //   } else {
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
      //     this.Thoat();
      //   }
      // }, (error) => {
      //   console.log('Error', error);
      // })
    }
  }
  //#endregion
}
