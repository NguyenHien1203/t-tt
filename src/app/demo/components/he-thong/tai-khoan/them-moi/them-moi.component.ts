import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Tree, TreeModule } from 'primeng/tree';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
})
export class ThemMoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  submitted = false;

  public formThemMoi = this.formBuilder.group({
    id: ["", []],
    tenDangNhap: ["", [Validators.required]],
    matKhau: ["", [Validators.required]],
    hoVaTen: ["", [Validators.required]],
    gioiTinh: ["", []],
    email: ["", []],
    trangThai: ["Y", []],
    donVi: ["", []],
    phongBan: ["", []],
    chucDanh: ["", []],
    nhomQuyen: ["", []],
    sdtNhaRieng: ["", []],
    sdtDiDong: ["", []],
    sdtCoQuan: ["", []],
  });

  //Khai báo đơn vị tree
  DonViTree: DMJsonModel[] = [];
  selectedDonVi: '';

  //Khai báo đơn vị tree
  PhongBan = [];
  selectedPhongBan: '';

  constructor(
    private taikhoanService: TaiKhoanService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.GetDataDonVi();
  }

  public ThemMoiTaiKhoan(): void {

  }

  public GetDataDonVi() {
    this.taikhoanService.GetDataDonVi().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonViTree = this.transformJsonToCustomStructure(data.objData)
        console.log(this.DonViTree);
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  onSelectChange(event: any) {
    let IdDonVi = '';
    IdDonVi = event.id;
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
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  transformJsonToCustomStructure(jsonData: any): DMJsonModel[] {
    const customData: DMJsonModel[] = [];

    // Biến đổi dữ liệu JSON thành cấu trúc dữ liệu tùy chỉnh
    // Ví dụ: jsonData có dạng [{ id: 1, name: 'Node 1', children: [...] }, ...]

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