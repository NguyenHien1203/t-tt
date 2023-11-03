import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DmPhongBan } from 'src/app/demo/api/danh-muc/phong-ban';
import { PhongbanService } from 'src/app/demo/service/danh-muc/phong-ban/phongban.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-cap-nhat-phong-ban',
  templateUrl: './cap-nhat-phong-ban.component.html',
  styleUrls: ['./cap-nhat-phong-ban.component.scss']
})
export class CapNhatPhongBanComponent implements OnInit {

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

  constructor(private route: ActivatedRoute, private phongbanService: PhongbanService, private formBuilder: FormBuilder) { }
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.GetDataDonVi();
  }

  public BindDataDialog(): void {
    this.phongbanService.GetPhongBanById(this.id).subscribe(data => {
      this.parentId = data.objData.parentId;
      this.checked = data.objData.trangThai;
      const objDonViSl = this.filterItems(this.DonViTree)
      data.objData.parentId = objDonViSl;
      data.objData.ngayTruyenThong = new Date(data.objData.ngayTruyenThong);
      this.formCapNhat.setValue(data.objData);
      console.log(this.formCapNhat)
    })
  }

  public filterItems(DonViTree: DMJsonModel[]) {
    let filteredItems = [];

    DonViTree.forEach(item => {
      if (item.id === this.parentId) {
        filteredItems.push(item);
      }

      if (item.id) {
        const nestedItems = this.filterItems(item.children);
        filteredItems = filteredItems.concat(nestedItems);
      }
    });

    return filteredItems;
  }



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
        console.log("Dữ liệu không hợp lệ")
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

}
