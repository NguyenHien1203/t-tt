import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LinhVucService } from './../../../../service/danh-muc/linh-vuc/linh-vuc.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})

export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string = '';

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
    parentId: ["", []],
    donViId: ["", []],
    phongBanId: ["", []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });

  submitted = false;
  idDonVi: any;
  idPhongBan: any;
  checked: boolean = false;
  dataUpdate: any = {};

  ngOnInit() {
    this.GetDataUnit();
    // console.log(this.authService.GetmUserInfo());
    // console.log(this.authService.GetDonViLamViec());
  }

  public closePopup() {
    this.show = false;
    this.close.emit(this.show);
  }

  public GetDataUnit() {
    this.linhVucService.getTreeUnits(this.authService.GetmUserInfo().name, this.authService.GetDonViLamViec()).subscribe(data => {
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
    this.idDonVi = event.id;
    this.linhVucService.getDataDepart(this.idDonVi).subscribe(data => {
      if (data.isError) {
        console.log("Dự liệu không hợp lệ");
      } else {
        this.department = data.objData;
      }
    }, (error) => {
      console.log('Lỗi', error);
    })
  }

  onSelectChangePhongBan(event: any) {
    this.idPhongBan = event.code;
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

  getDataField() {
    this.linhVucService.getIdField(this.id).subscribe(data => {
      console.log(data);
      this.formUpdate.setValue(data);
      console.log(this.formUpdate.value);
    })
  }

  updatedField() {
    this.formUpdate.value.donViId = this.authService.GetmUserInfo().donViId;
    this.formUpdate.value.donViIdPhongban = this.idDonVi;
    this.formUpdate.value.parentId = this.authService.GetmUserInfo().donViId;
    this.formUpdate.value.phongBanId = this.idPhongBan ?? 0;
    if (this.formUpdate.valid) {
      this.submitted = true;
      this.linhVucService.updateField(this.formUpdate.value, this.id).subscribe(data => {
        if (data.code == 200) {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật không thành công', life: 3000 });
        }
      });
    }
    this.closePopup();
  }
}

