import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-them-moi-phong-ban',
  templateUrl: './them-moi-phong-ban.component.html',
  styleUrls: ['./them-moi-phong-ban.component.scss']
})
export class ThemMoiPhongBanComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  timkiems: TimKiemModel = {
    keyWord: "",
    Nam: 0,
    TuNgay: new Date(),
    DenNgay: new Date()
};

  submitted = false;
  phongBan: any ;
  public formThemMoi = this.formBuilder.group({
    id: ["", []],
    maPhongBan: ["", [Validators.required]],
    tenPhongBan: ["", [Validators.required]],
    uRL: ["", []],
    soDienThoai: ["", []],
    fax: ["", []],
    ngayTruyenThong: [new Date, []],
    diaChi: ["", []],
    email: ["", []],
    website: ["", []],
    ghiChu: ["", []],
    hienThi: [false, []],
    // donvi: ["", []],
    soThuTu: ["", []],
  });


  productDialog: boolean = false;

  //Khai báo đơn vị tree
  DonViTree: DMJsonModel[] = [];
  selectedDonVi: '';

  //Khai báo phòng ban option
  PhongBan = [];
  selectedPhongBan: '';

  //Khai báo nhóm quyền option
  NhomQuyen = [];
  selectedNhomQuyen: '';

  //Khai báo chức danh option
  ChucDanh = [];
  selectedChucDanh: '';

  constructor(
    // private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private dmPhongBanService: PhongbanService
  ) {
  }

  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }



  public ThemMoiPhongBan() {
    this.submitted = true;
    console.log(this.formThemMoi)
    if (this.formThemMoi.valid) {
      this.phongBan = this.formThemMoi.value;
      this.dmPhongBanService.addPhongBan(this.phongBan).subscribe(data => {
        if (data.trangThai == true) {
          this.dmPhongBanService.getDanhSachPhongBan(this.timkiems);
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới phòng ban thành công', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Thêm mới không thành công', life: 3000 });
        }
      });
      this.productDialog = false;
    }
  }
}





