import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { DonViThucHien } from 'src/app/models/he-thong/tai-khoan';

@Component({
  selector: 'app-cap-nhat-dv-thuc-hien',
  templateUrl: './cap-nhat-dv-thuc-hien.component.html',
})
export class CapNhatDvThucHienComponent {
  @Input() hienThidvth: boolean = false;
  @Input() DonViThId: string = '1';
  @Output() tatPopup = new EventEmitter<boolean>();
  @Output() luuDonVi = new EventEmitter<any>();

  // lstDonViThucHien: DonViThucHien[] = [];

  DonViThucHien: DonViThucHien = {
    IdDonVi: '',
    IdNhomQuyen: '',
    TenDonVi: '',
    TenNhomQuyen: ''
  };

  DonViTHTree: DMJsonModel[] = [];
  NhomQuyenTHOption: [];
  constructor(
    private formBuilder: FormBuilder,
    private taikhoanService: TaiKhoanService,
  ) {
  }

  public formCapNhatdvth = this.formBuilder.group({
    donViTh: ["", []],
    nhomQuyenTh: ["", []],
  });

  public SubmitCapNhatDvth(): void {
    this.luuDonVi.emit(this.formCapNhatdvth.value);
    this.ThoatDvThucHien();
  }

  public ThoatDvThucHien(): void {
    this.hienThidvth = false;
    this.formCapNhatdvth.reset();
    this.tatPopup.emit(this.hienThidvth);
  }

  public BindDataDVTH(): void {
    this.GetTreeDonViThucHien();
    this.GetNhomQuyen();
  }

  public GetTreeDonViThucHien() {
    this.taikhoanService.GetDataDonViThucHien(this.DonViThId).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.DonViTHTree = this.transformJsonToCustomStructure(data.objData)
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
        this.NhomQuyenTHOption = data.objData;
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
