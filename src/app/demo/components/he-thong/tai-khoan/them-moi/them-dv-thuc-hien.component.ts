import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaiKhoanService } from 'src/app/demo/service/he-thong/tai-khoan.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { DonViThucHien } from 'src/app/models/he-thong/tai-khoan';
import { CookieService } from 'ngx-cookie-service';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Component({
  selector: 'app-them-dv-thuc-hien',
  templateUrl: './them-dv-thuc-hien.component.html',
})
export class ThemDvThucHienComponent {
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
    private cookieService: CookieService
  ) {
  }

  public formThemMoidvth = this.formBuilder.group({
    donViTh: ["", []],
    nhomQuyenTh: ["", []],
  });

  public SubmitDvth(): void {
    
    this.luuDonVi.emit(this.formThemMoidvth.value);
    this.ThoatDvThucHien();
  }

  public ThoatDvThucHien(): void {
    this.hienThidvth = false;
    this.formThemMoidvth.reset();
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
