import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
})
export class CapNhatComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  submitted: boolean = false;

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
  ) {
  }

  ngOnInit(): void {
    this.GetDataDonVi();
    this.GetChucDanh();
    this.GetNhomQuyen();
  }

  public formCapNhat = this.formBuilder.group({
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
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  /**
   * Bind dữ liệu cập nhật
   */
  public BindDataDialog(): void {
    this.taikhoanService.GetDataByIdTaiKhoan(this.id).subscribe(data =>{
      console.log(data);
      // this.formCapNhat.setValue(data);
    })
  }

}
