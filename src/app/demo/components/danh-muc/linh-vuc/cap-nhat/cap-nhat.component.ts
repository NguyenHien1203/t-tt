import { DMJsonModel } from './../../../../../models/common/DMJsonModel';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LinhVucService } from './../../../../service/danh-muc/linh-vuc/linh-vuc.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})

export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string = '';
  selectedPhongBan: string = '';

  unitTree: DMJsonModel[] = [];
  selectedUnit: '';

  department = [];
  selectedDepart: '';

  constructor(private linhVucService: LinhVucService, private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { }

  public formUpdate = this.formBuilder.group({
    id: [0, []],
    tenLinhVuc: ["", [Validators.required]],
    vietTat: ["", [Validators.required]],
    ghiChu: ["", []],
    thuTu: ["", []],
    hienThi: ["", []],
    donViIdPhongban: ["", []],
    soHshienTai: ["", []],
    soHstruoc: ["", []],
    parentId: ["", []],
    donViId: ["", []],
    phongBanId: ["", []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });

  submitted = false;

  checked: boolean = false;

  phongBanId?: number;
  donViIdPhongban?: number;

  valueFormUpdate: any;

  ngOnInit() {
    this.GetDataUnit();
    // console.log(this.authService.GetmUserInfo());
    // console.log(this.authService.GetDonViLamViec());
  }

  public closePopup() {
    this.show = false;
    this.close.emit(this.show);
    this.submitted = false;
    this.formUpdate.reset();
    this.department = [];
  }

  public GetDataUnit() {
    this.linhVucService.getTreeUnits().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu này không hợp lệ.");
      } else {
        this.unitTree = this.transformJsonCustomStructure(data.objData);
      }
    }, (error) => {
      console.log("Lỗi", error);
    })
  }

  onSelectChangeDonVi(event: any) {
    if (event) {
      const id = event.id;
      this.linhVucService.getDataDepart(id).subscribe(data => {
        if (data.isError) {
          console.log("Dự liệu không hợp lệ");
        } else {
          this.department = data.objData;
          console.log("department", this.department);
        }
      }, (error) => {
        console.log('Lỗi', error);
      })
    }
  }

  onSelectDepart(id: any) {
    this.linhVucService.getDataDepart(id).subscribe(data => {
      if (data.isError) {
        console.log("Dự liệu không hợp lệ");
      } else {
        this.department = data.objData;
        console.log(this.department);
      }
    }, (error) => {
      console.log('Lỗi', error);
    })
  }

  getDataField() {
    this.linhVucService.getLinhVuc(this.id).subscribe(data => {

      this.donViIdPhongban = data.donViIdPhongban;
      const objDonViSl = this.filterItems(this.unitTree)

      data.donViIdPhongban = objDonViSl;

      this.phongBanId = data.phongBanId;

      this.onSelectDepart(this.donViIdPhongban);

      this.formUpdate.setValue(data);
    })
  }

  public filterItems(unitTree: DMJsonModel[]) {
    let filteredItems = [];

    unitTree.forEach(item => {
      if (item.id === this.donViIdPhongban) {
        filteredItems.push(item);
      }

      if (item.id) {
        const nestedItems = this.filterItems(item.children);
        filteredItems = filteredItems.concat(nestedItems);
      }
    });

    return filteredItems;
  }

  transformJsonCustomStructure(jsonData: any): DMJsonModel[] {
    const customData: DMJsonModel[] = [];

    for (const item of jsonData) {
      const customModel: DMJsonModel = {
        id: item.id,
        label: item.title,
        children: []
      }

      if (item.subs && item.subs.length > 0) {
        customModel.children = this.transformJsonCustomStructure(item.subs);
      }
      customData.push(customModel);
    }
    return customData;
  }

  updatedField() {
    this.valueFormUpdate = this.formUpdate.value;

    this.submitted = true;

    this.formUpdate.value.parentId = this.authService.GetmUserInfo().donViId;
    this.formUpdate.value.donViId = this.authService.GetmUserInfo().donViId;

    if (this.valueFormUpdate.donViIdPhongban.id) {
      this.formUpdate.value.donViIdPhongban = this.valueFormUpdate.donViIdPhongban.id;
    } else if (this.valueFormUpdate.donViIdPhongban[0].id) {
      this.formUpdate.value.donViIdPhongban = this.valueFormUpdate.donViIdPhongban[0].id;
    }

    // this.formUpdate.value.donViIdPhongban = this.valueFormUpdate.donViIdPhongban.id ?? 0;
    this.formUpdate.value.phongBanId = this.valueFormUpdate.phongBanId ?? 0;

    console.log("origin:", this.formUpdate.value);
    console.log("value", this.valueFormUpdate);
    // console.log("this.valueFormUpdate.donViIdPhongban.id", this.valueFormUpdate.donViIdPhongban[0].id);

    if (this.formUpdate.valid) {
      this.submitted = true;
      this.linhVucService.capNhat(this.formUpdate.value, this.id).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      });
    }
    // this.department = [];
    this.closePopup();
  }
}

