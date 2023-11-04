import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dA } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { DmPhongBan, TimKiemModel } from 'src/app/demo/api/danh-muc/phong-ban';
import { DonViService } from 'src/app/demo/service/danh-muc/don-vi/don-vi.service';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { DonVi } from 'src/app/models/danh-muc/don-vi';

@Component({
  selector: 'app-them-moi-phong-ban',
  templateUrl: './them-moi-phong-ban.component.html',
  styleUrls: ['./them-moi-phong-ban.component.scss']
})
export class ThemMoiPhongBanComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  checkHt: boolean = false;
  timkiems: TimKiemModel = {
    keyWord: "",
    Nam: 0,
    TuNgay: new Date(),
    DenNgay: new Date()
  };

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
    MaDVPC: ["", []],
    Dbname: ["", []],
    PhanLoai: [0, []],
    IsPhongBan: [0, []],
  });

  public CheckHienThi(): void {
    this.checkHt = !this.checkHt;
  }

  productDialog: boolean = false;
  IdDonVi: any;
  Cap: any;
  MaDVPC: any;
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
    private dmPhongBanService: PhongbanService,
  ) {
  }


  ngOnInit(): void {
    this.GetDataDonVi();
  }

  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }


  public ThemMoiPhongBan() {
    this.submitted = true;
    this.formThemMoi.value.ParentId = this.IdDonVi;
    this.formThemMoi.value.Cap = this.Cap + 1;
    this.formThemMoi.value.Dbname = "0";
    this.formThemMoi.value.IsPhongBan = 1;
    if (this.formThemMoi.value.Cap == 2) {
      this.formThemMoi.value.PhanLoai = 3;
    } else {
      this.formThemMoi.value.PhanLoai = 0;
    }
    this.formThemMoi.value.TrangThai = this.checkHt;

    //Noi Chuoi 2 string va convert chuoi sang type script
    const ParentId = this.IdDonVi;
    const formatParent = ParentId.toString().padStart(3, '0');
    console.log(formatParent);

    const ThuTu = this.formThemMoi.value.ThuTu;
    const formatThuTu = ThuTu.toString().padStart(3, '0');
    console.log(formatThuTu);

    this.formThemMoi.value.MaDVPC = `${formatParent}${formatThuTu}`;
    console.log(this.formThemMoi.value.MaDVPC);

    if (this.formThemMoi.valid) {
      console.log(this.formThemMoi.value)
      this.phongBan = this.formThemMoi.value;
      this.dmPhongBanService.addPhongBan(this.phongBan).subscribe(data => {
        console.log(data)
        // if (data.code == 200) {
        //   this.dmPhongBanService.getDanhSachPhongBan(this.timkiems);
        //   this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới phòng ban thành công', life: 3000 });
        // } else {
        //   this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Thêm mới không thành công', life: 3000 });
        // }
      });
      this.productDialog = false;
    }
  }


  onSelectChange(event: any) {
    this.IdDonVi = event.id;
    this.Cap = event.cap;
    console.log(this.Cap)
  }

  public GetDataDonVi() {
    alert("Vao")
    this.dmPhongBanService.GetDataDonVi().subscribe(data => {
      console.log(data)
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonViTree = this.transformJsonToCustomStructure(data.objData)
        console.log(this.DonViTree)
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  transformJsonToCustomStructure(jsonData: any): DMJsonModel[] {
    const customData: DMJsonModel[] = [];

    // Biến đổi dữ liệu JSON thành cấu trúc dữ liệu tùy chỉnh
    // Ví dụ: jsonData có dạng [{ id: 1, name: 'Node 1', children: [...] }, ...]

    for (const item of jsonData) {
      const customNode: DMJsonModel = {
        id: item.id,
        cap:item.cap,
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







