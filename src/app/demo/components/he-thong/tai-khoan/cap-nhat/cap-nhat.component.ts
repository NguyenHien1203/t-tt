import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { TaiKhoan } from 'src/app/models/he-thong/tai-khoan';
@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
})
export class CapNhatComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  submitted: boolean = false;

  public donViThucHiens: any[] = [];
  Model_TaiKhoan: TaiKhoan = {};
  DonViId: "";

  //Khai báo form any cập nhật
  formCapNhat_any: any;

  //Khai báo đơn vị tree
  DonViTree: DMJsonModel[] = [];

  //Khai báo phòng ban option
  PhongBan: any[] = [];

  //Khai báo nhóm quyền option
  NhomQuyen: any[] = [];

  //Khai báo chức danh option
  ChucDanh: any[] = [];
  formCapNhat_fomat: any;
  dvThucHienDialog: boolean = false;
  public donViThucHien: any[];

  constructor(
    private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private service: MessageService,
  ) {

  }

  ngOnInit(): void {
    this.GetDataDonVi();
    this.GetChucDanh();
    this.GetNhomQuyen();
  }
  itemData: any;
  public formCapNhat = this.formBuilder.group({
    id: ["", []],
    tenDangNhap: ["", [Validators.required]],
    // matKhau: ["", []],
    hoVaTen: ["", [Validators.required]],
    gioiTinh: ["1", []],
    email: ["", []],
    donVi: [, [Validators.required]],
    phongBan: [, [Validators.required]],
    chucDanh: [, []],
    nhomQuyen: [, [Validators.required]],
    sdtNhaRieng: ["", [Validators.pattern(/^\d{10}$/)]],
    sdtDiDong: ["", [Validators.pattern(/^\d{10}$/)]],
    sdtCoQuan: ["", [Validators.pattern(/^\d{10}$/)]],
  });

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
      } else {
        this.ChucDanh = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  //mở popub thêm mới đơn vị thực hiện
  public ThemMoiDvth(): void {
    if (this.DonViId !== undefined) {
      this.dvThucHienDialog = true;
    } else {
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Bạn cần chọn đơn vị' });
    }
  }

  onSelectChange(event: any) {
    let IdDonVi = '';
    IdDonVi = event.id;
    this.taikhoanService.GetDataPhongBanByDvi(IdDonVi).subscribe(data => {
      if (data.isError) {
      } else {
        this.PhongBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
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

  public Thoat(): void {
    this.submitted = false;
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  /**
   * Bind dữ liệu cập nhật
   */
  public BindDataDialog(): void {
    this.taikhoanService.GetDataByIdTaiKhoan(this.id).subscribe(data => {
      //Bind phòng ban theo đơn vị
      var donviid = this.filterItemsDonVi(this.DonViTree, data.objUser.donVi);
      this.DonViId = data.objUser.donVi;
      this.ChangePhongBan(data.objUser.donVi, () => {
        this.itemData = {
          hoVaTen: data.objUser.hoVaTen as string,
          tenDangNhap: data.objUser.tenDangNhap as string,
          id: data.objUser.id,
          donVi: donviid,
          phongBan: data.objUser.phongBan,
          chucDanh: data.objUser.chucDanh,
          nhomQuyen: data.objUser.nhomQuyen,
          // matKhau: "",
          gioiTinh: data.objUserCT.gioiTinh as string,
          email: data.objUserCT.email as string,
          sdtNhaRieng: data.objUserCT.sdtNhaRieng as string,
          sdtCoQuan: data.objUserCT.sdtCoQuan as string,
          sdtDiDong: data.objUserCT.sdtDiDong as string,
        }

        this.formCapNhat.setValue(this.itemData);
        this.donViThucHiens = data.lstUserDvth;
      });
    })
  }

  /**
   * changephongBan để bind dữ liệu cập nhật
   */
  public ChangePhongBan(donviid: string, callback) {
    this.taikhoanService.GetDataPhongBanByDvi(donviid).subscribe(dataPB => {
      if (dataPB.isError) {
      } else {
        this.PhongBan = dataPB.objData;
      }

      callback();
    })
  }

  /**
   * XoaDvth
   */
  public XoaDvth(donvithuchien: any) {
    this.donViThucHiens.forEach((obj, index) => {
      if (obj.id === donvithuchien.id) {
        this.donViThucHiens.splice(index, 1); // Xóa đối tượng thỏa mãn điều kiện
      }
    });
  }

  public ThoatDvThucHien(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.dvThucHienDialog = false;
    else
      this.dvThucHienDialog = false;
  }

  public LuuDonVi(itemHt: any) {
    // Sao chép mảng bằng cách sử dụng spread operator
    const copiedArray = [...this.donViThucHiens];
    if (copiedArray.length > 0) {
      for (const item of copiedArray) {
        if (item.IdDonVi === itemHt.donViTh.id && item.IdNhomQuyen === itemHt.nhomQuyenTh.code) {
          // Nếu đã tồn tại, không thay đổi mảng
          return;
        }
      }
    }

    this.donViThucHiens.push({
      IdDonVi: itemHt.donViTh.id.toString(),
      IdNhomQuyen: itemHt.nhomQuyenTh.code.toString(),
      tenDonVi: itemHt.donViTh.label,
      tenNhomQuyen: itemHt.nhomQuyenTh.name
    });
  }

  public CapNhatTaiKhoan(): void {
    this.submitted = true;
    this.formCapNhat_fomat = this.formCapNhat.value;
    if (this.formCapNhat.valid) {
      this.formCapNhat_fomat = this.formCapNhat.value;
      this.Model_TaiKhoan.id = this.formCapNhat_fomat.id.toString();
      this.Model_TaiKhoan.tenDangNhap = this.formCapNhat_fomat.tenDangNhap;
      this.Model_TaiKhoan.gioiTinh = this.formCapNhat_fomat.gioiTinh;
      this.Model_TaiKhoan.hoVaTen = this.formCapNhat_fomat.hoVaTen;
      this.Model_TaiKhoan.matKhau = this.formCapNhat_fomat.matKhau;
      this.Model_TaiKhoan.email = this.formCapNhat_fomat.email;
      this.Model_TaiKhoan.donViId = this.formCapNhat_fomat.donVi[0].id.toString();
      this.Model_TaiKhoan.phongBanId = this.formCapNhat_fomat.phongBan.toString();
      this.Model_TaiKhoan.nhomQuyenId = this.formCapNhat_fomat.nhomQuyen.toString();
      this.Model_TaiKhoan.chucDanhId = this.formCapNhat_fomat.chucDanh.toString();
      this.Model_TaiKhoan.sdtNhaRieng = this.formCapNhat_fomat.sdtNhaRieng;
      this.Model_TaiKhoan.sdtCoQuan = this.formCapNhat_fomat.sdtCoQuan;
      this.Model_TaiKhoan.sdtDiDong = this.formCapNhat_fomat.sdtDiDong;

      this.taikhoanService.UpdateTaiKhoan(this.Model_TaiKhoan, this.donViThucHiens).subscribe(data => {
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

  public filterItemsDonVi(DonViTree: DMJsonModel[], dieukienloc: any) {
    let filteredItems = [];
    DonViTree.forEach(item => {
      if (item.id === dieukienloc) {
        filteredItems.push(item);
      }
      if (item.id) {
        const nestedItems = this.filterItemsDonVi(item.children, dieukienloc);
        filteredItems = filteredItems.concat(nestedItems);
      }
    });
    return filteredItems;
  }

  public filterItemsChung(model: any[], dieukienloc: any) {

    let filteredItems = [];
    model.forEach(item => {
      if (item.code === dieukienloc) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  }
}
