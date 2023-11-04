import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LinhVucService } from 'src/app/demo/service/danh-muc/linh-vuc/linh-vuc.service';
import { LoaiHoSoService } from 'src/app/demo/service/danh-muc/loai-ho-so/loai-ho-so.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  submitted = false;
  public formCreate = this.formBuilder.group({
    id: [0, []],
    maHs: ["", [Validators.required]],
    tenLoaiHoSo: ["", [Validators.required]],
    donViId: ["", [Validators.required]],
    phongBanId: ["", []],
    soHshienTai: ["", []],
    soHstruoc: ["", []],
    thuTu: ["", []],
    ghiChu: ["", []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });
  valueFormCreate: any;

  unitTree: DMJsonModel[] = [];
  selectedUnit: '';

  department = [];
  selectedDepart: '';

  constructor(private formBuilder: FormBuilder, private linhVucService: LinhVucService, private authService: AuthService, private loaiHoSoService: LoaiHoSoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.GetDataUnit();
  }

  public closePopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCreate.reset();
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

  createRecord() {
    this.submitted = true;
    this.valueFormCreate = this.formCreate.value;

    this.formCreate.value.phongBanId = this.valueFormCreate.phongBanId.code ?? 0;
    this.formCreate.value.donViId = this.valueFormCreate.donViId.id ?? 0;

    console.log(this.formCreate.value);

    if (this.formCreate.valid) {
      this.loaiHoSoService.createRecord(this.formCreate.value).subscribe(data => {
        if (data.code == 200) {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
        }
      });
      this.closePopup();
      this.formCreate.reset();
    }
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
}
