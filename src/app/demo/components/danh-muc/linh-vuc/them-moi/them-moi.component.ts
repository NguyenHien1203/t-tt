import { LinhVucService } from './../../../../service/danh-muc/linh-vuc/linh-vuc.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';
import { AuthService } from 'src/app/common/auth.services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  unitTree: DMJsonModel[] = [];
  selectedUnit: '';

  department = [];
  selectedDepart: '';

  public formCreate = this.formBuilder.group({
    id: [0, []],
    vietTat: ["", [Validators.required]],
    tenLinhVuc: ["", [Validators.required]],
    thuTu: ["", []],
    hienThi: ["", []],
    ghiChu: ["", []],
    donViId: ["", []],
    phongBanId: ["", []],
    parentId: ["", []],
    soHshientai: [0, []],
    soHstruoc: [0, []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
    donViIdPhongban: ["", [Validators.required]],
  });

  valueFormCreate: any;

  checked: boolean = false;

  submitted = false;

  constructor(private linhVucService: LinhVucService, private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.GetDataUnit();
  }

  public closePopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCreate.reset();
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
    if (event) {
      const id = event.id;
      this.linhVucService.getDataDepart(id).subscribe(data => {
        if (data.isError) {
          console.log("Dự liệu không hợp lệ");
        } else {
          this.department = data.objData;
        }
      }, (error) => {
        console.log('Lỗi', error);
      })
    }
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

  public createField() {
    this.submitted = true;
    this.valueFormCreate = this.formCreate.value;

    this.formCreate.value.donViId = this.authService.GetmUserInfo().donViId;
    this.formCreate.value.parentId = this.authService.GetmUserInfo().donViId;
    
    this.formCreate.value.phongBanId = this.valueFormCreate.phongBanId.code ?? 0;
    this.formCreate.value.donViIdPhongban = this.valueFormCreate.donViIdPhongban.id ?? 0;

    if (this.formCreate.valid) {
      this.linhVucService.createField(this.formCreate.value).subscribe(data => {
        if (data.code == 200) {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
        }
      });
      this.closePopup();
      this.formCreate.reset();
    }
  }
}
