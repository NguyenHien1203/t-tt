import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import {TimKiemModel } from 'src/app/models/danh-muc/don-vi/donvi.model';

@Component({
  selector: 'app-them-don-vi-vao-nhom',
  templateUrl: './them-don-vi-vao-nhom.component.html',
  styleUrls: ['./them-don-vi-vao-nhom.component.scss']
})
export class ThemDonViVaoNhomComponent {
  constructor(private route: ActivatedRoute, 
    private Service: NhomDonViService,
     private formBuilder: FormBuilder, 
     private messageService: MessageService) { }


  //Lấy dữ liệu đầu vào
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  //
  
  submitted = false;
  NhomDonVi: any = {};
  TenNhomDonVi: string;
  
    //Khai báo đơn vị tree
    DonViTree: DMJsonModel[] = [];
    selectedDonVi: '';

   //#region Khai báo form thêm mới và dữ liệu
   public FormNhomDonVi = this.formBuilder.group({
    id: [0, []],
    tenNhom: ["", []],
  });
  //#endregion

  //#region bind dữ liệu cần chỉnh sửa
  public BindDataDialog(): void {
    this.Service.GetNhomDonViById(this.id).subscribe(data => {
      this.FormNhomDonVi.setValue(data);
      var formvalue = this.FormNhomDonVi.value;
      this.TenNhomDonVi = formvalue.tenNhom;
    })
  }
  //#endregion
  
  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

  public GetDataDonVi() {
    this.Service.GetDataDonVi().subscribe(data => {
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
