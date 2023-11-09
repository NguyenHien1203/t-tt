import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DonViService } from 'src/app/demo/service/danh-muc/don-vi/don-vi.service';

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
  DonViAdd: any;
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
    email: ["", []],
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
    this.formThemMoi.reset();
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

  //Get danh sach don vi
  public GetDataDonVi() {
    this.dmDonViService.GetDataDonVi().subscribe(data => {
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
      this.formThemMoi.value.Url = this.formThemMoi_fomat.Website;
      this.formThemMoi.value.TrangThai = this.checkHt;

      this.DonViAdd = this.formThemMoi.value;
      this.dmDonViService.addDonVi(this.DonViAdd).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          this.Thoat();
        }
      }, (error) => {
        console.log('Error', error);
      })
    }
  }
  //#endregion
}
