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

  constructor(private linhVucService: LinhVucService, private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService) { }

  checkboxValue: boolean = false;

  submitted = false;
  public formCreate = this.formBuilder.group({
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

  idDonVi: any;
  idPhongBan: any;
  checked: boolean = false;

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

  onSelectChangeDonVi() {
    this.idDonVi = this.formCreate.value;
    const ida = this.idDonVi.donViIdPhongban.id;
    console.log(ida);
    
    // this.idDonVi = event.id;
    // this.linhVucService.getDataDepart(ida).subscribe(data => {
    //   if (data.isError) {
    //     console.log("Dự liệu không hợp lệ");
    //   } else {
    //     this.department = data.objData;
    //   }
    // }, (error) => {
    //   console.log('Lỗi', error);
    // })
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

  public createField() {
    this.formCreate.value.donViId = this.authService.GetmUserInfo().donViId;
    this.formCreate.value.donViIdPhongban = this.idDonVi;
    this.formCreate.value.parentId = this.authService.GetmUserInfo().donViId;
    this.formCreate.value.phongBanId = this.idPhongBan;
    this.linhVucService.createField(this.formCreate.value).subscribe(data => {
      if (data.code == 200) {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công', life: 3000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Tạo mới không thành công', life: 3000 });
      }
    });
    this.formCreate.reset();
    this.closePopup();
  }
}
