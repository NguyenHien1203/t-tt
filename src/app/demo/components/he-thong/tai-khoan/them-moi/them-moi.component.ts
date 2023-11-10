import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tree, TreeModule } from 'primeng/tree';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { Message, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { DonViThucHien, TaiKhoan } from 'src/app/models/he-thong/tai-khoan';
@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
})
export class ThemMoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  // DVTH: DonViThucHien;

  submitted = false;

  Model_TaiKhoan: TaiKhoan = {};

  public donViThucHien: any[];

  formThemMoi_fomat: any;

  public formThemMoi = this.formBuilder.group({
    id: ["", []],
    tenDangNhap: ["", [Validators.required]],
    matKhau: ["", [Validators.required]],
    hoVaTen: ["", [Validators.required]],
    gioiTinh: ["1", []],
    email: ["", []],
    donVi: ["", [Validators.required]],
    phongBan: ["", [Validators.required]],
    chucDanh: ["", []],
    nhomQuyen: ["", [Validators.required]],
    sdtNhaRieng: ["", [Validators.pattern(/^\d{10}$/)]],
    sdtDiDong: ["", [Validators.pattern(/^\d{10}$/)]],
    sdtCoQuan: ["", [Validators.pattern(/^\d{10}$/)]],
  });

  msgs: Message[] = [];

  DonViId: "";

  dvThucHienDialog: boolean = false;

  //Khai báo đơn vị tree
  DonViTree: DMJsonModel[] = [];

  //Khai báo phòng ban option
  PhongBan = [];

  //Khai báo nhóm quyền option
  NhomQuyen = [];

  //Khai báo chức danh option
  ChucDanh = [];

  constructor(
    private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: MessageService,
    private cookieService: CookieService
  ) {
    this.donViThucHien = [];
  }

  ngOnInit(): void {
    this.GetDataDonVi();
    this.GetChucDanh();
    this.GetNhomQuyen();
  }

  public ThemMoiTaiKhoan(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.formThemMoi_fomat = this.formThemMoi.value;
      this.Model_TaiKhoan.tenDangNhap = this.formThemMoi_fomat.tenDangNhap;
      this.Model_TaiKhoan.gioiTinh = this.formThemMoi_fomat.gioiTinh;
      this.Model_TaiKhoan.hoVaTen = this.formThemMoi_fomat.hoVaTen;
      this.Model_TaiKhoan.matKhau = this.formThemMoi_fomat.matKhau;
      this.Model_TaiKhoan.email = this.formThemMoi_fomat.email;
      this.Model_TaiKhoan.donViId = this.formThemMoi_fomat.donVi.id.toString();
      this.Model_TaiKhoan.phongBanId = this.formThemMoi_fomat.phongBan.code.toString();
      this.Model_TaiKhoan.nhomQuyenId = this.formThemMoi_fomat.nhomQuyen.code.toString();
      this.Model_TaiKhoan.chucDanhId = this.formThemMoi_fomat.chucDanh.code.toString();
      this.Model_TaiKhoan.sdtNhaRieng = this.formThemMoi_fomat.sdtNhaRieng;
      this.Model_TaiKhoan.sdtCoQuan = this.formThemMoi_fomat.sdtCoQuan;
      this.Model_TaiKhoan.sdtDiDong = this.formThemMoi_fomat.sdtDiDong;

      this.taikhoanService.AddTaiKhoan(this.Model_TaiKhoan, this.donViThucHien).subscribe(data => {
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

   /**
   * XoaDvth
   */
   public XoaDvth(donvithuchien: any) {
    this.donViThucHien.forEach((obj, index) => {
      if (obj.id === donvithuchien.id) {
        this.donViThucHien.splice(index, 1); // Xóa đối tượng thỏa mãn điều kiện
      }
    });
  }

  public GetDataDonVi() {
    this.taikhoanService.GetDataDonVi().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonViTree = this.transformJsonToCustomStructure(data.objData)
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public GetNhomQuyen() {
    this.taikhoanService.GetNhomQuyen().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.NhomQuyen = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public GetChucDanh() {
    this.taikhoanService.GetChucDanh().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.ChucDanh = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  onSelectChange(event: any) {
    let IdDonVi = '';
    IdDonVi = event.id;
    this.DonViId = event.id;
    this.taikhoanService.GetDataPhongBanByDvi(IdDonVi).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.PhongBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public Thoat(): void {
    this.submitted = false;
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  public ThemMoiDvth(): void {
    if (this.DonViId !== undefined) {
      this.dvThucHienDialog = true;
    } else {
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Bạn cần chọn đơn vị' });
    }
  }

  public ThoatDvThucHien(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.dvThucHienDialog = false;
    else
      this.dvThucHienDialog = false;
  }
  
  public LuuDonVi(itemHt: any) {
    // Sao chép mảng bằng cách sử dụng spread operator
    const copiedArray = [...this.donViThucHien];
    if (copiedArray.length > 0) {
      for (const item of copiedArray) {
        if (item.IdDonVi === itemHt.donViTh.id && item.IdNhomQuyen === itemHt.nhomQuyenTh.code) {
          // Nếu đã tồn tại, không thay đổi mảng
          return;
        }
      }
    }

    this.donViThucHien.push({
      IdDonVi: itemHt.donViTh.id.toString(),
      IdNhomQuyen: itemHt.nhomQuyenTh.code.toString(),
      TenDonVi: itemHt.donViTh.label,
      TenNhomQuyen: itemHt.nhomQuyenTh.name
    });
  }

  public LoadThemMoi(): void {
    this.donViThucHien = [];
  }

  transformJsonToCustomStructure(jsonData: any): DMJsonModel[] {
    const customData: DMJsonModel[] = [];
    for (const item of jsonData) {
      const customNode: DMJsonModel = {
        id: item.id,
        label: item.title,
        children: []
      };

      if (item.subs && item.subs.length > 0) {
        customNode.children = this.transformJsonToCustomStructure(item.subs);
      }

      customData.push(customNode);
    }

    return customData;
  }


}
