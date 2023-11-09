import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DmPhongBan } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat-phong-ban',
  templateUrl: './cap-nhat-phong-ban.component.html',
  styleUrls: ['./cap-nhat-phong-ban.component.scss']
})
export class CapNhatPhongBanComponent implements OnInit {
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  PhongBan: any = {};
  submitted = false;
  DonViTree: DMJsonModel[] = [];
  selectedDonVi: '';
  productDialog: boolean = false;
  IdDonVi: any;
  Cap: any;
  MaDVPC: any;
  checked: boolean = false;
  parentId?: number;
  checkHt: boolean = false;

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    maDonVi: ["", []],
    tenDonVi: ["", []],
    parentId: [[], []],
    url: ["", []],
    ngayTruyenThong: [new Date, []],
    diaChi: ["", []],
    ghiChu: ["", []],
    sdt: ["", []],
    fax: ["", []],
    website: ["", []],
    email: ["", []],
    thuTu: ["", []],
    trangThai: [false, []],
  });

  constructor(private route: ActivatedRoute, private phongbanService: PhongbanService, private formBuilder: FormBuilder, private messageService: MessageService) { }
  

  ngOnInit(): void {
    this.GetDataDonVi();
  }

  public BindDataDialog(): void {
    this.phongbanService.GetPhongBanById(this.id).subscribe(data => {
      console.log("data:  " ,data);
      this.parentId = data.parentId;
      this.checked = data.trangThai;
      data.ngayTruyenThong = new Date(data.ngayTruyenThong);
      this.formCapNhat.setValue(data);
      console.log(this.formCapNhat)
    })
  }


  //Hàm bind ra dữ liệu selected sau khi sửa

  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  onSelectChange(event: any) {
    this.IdDonVi = event.id;
    this.Cap = event.cap;
  }

  public CheckHienThi(): void {
    this.checkHt = !this.checkHt;
  }

  public GetDataDonVi() {
    this.phongbanService.GetDataDonVi().subscribe(data => {
      if (data.isError) {
      } else {
        this.DonViTree = this.transformJsonToCustomStructure(data.objData)
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
        cap: item.cap,
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

  public CapNhatPhongBan(): void {
    this.submitted = true;
    if (this.formCapNhat.valid) {
      this.PhongBan = this.formCapNhat.value;
      this.parentId = this.PhongBan.parentId.id;
      this.PhongBan.parentId = this.parentId;
      this.phongbanService.CapNhatPhongBan(this.PhongBan).subscribe(
        data => {
          console.log('data', data);
          let resData = data as ResponeMessage;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
        })
    }
  }
}
