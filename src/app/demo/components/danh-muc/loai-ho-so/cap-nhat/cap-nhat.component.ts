import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LinhVucService } from 'src/app/demo/service/danh-muc/linh-vuc/linh-vuc.service';
import { LoaiHoSoService } from 'src/app/demo/service/danh-muc/loai-ho-so/loai-ho-so.service';
import { DMJsonModel } from 'src/app/models/common/DMJsonModel';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;
  @Input() id: string = '';

  submitted = false;

  public formCapNhat = this.formBuilder.group({
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
    moTa: ["", []],
    phanLoai: [0, []],
    hienThi: [true, []],
    linhVucId: [0, []],
    linhVucChaId: [0, []],
  });
  valueFormCapNhat: any;

  donViTree: DMJsonModel[] = [];
  selectedDonVi: '';

  phongBan = [];
  selectedPhongBan: '';

  phongBanId?: number;
  donViId?: number;

  constructor(private formBuilder: FormBuilder, private linhVucService: LinhVucService, private authService: AuthService, private loaiHoSoService: LoaiHoSoService, private messageService: MessageService) { }

  ngOnInit() {
    this.DuLieuDonVi();
  }

  public DuLieuDonVi() {
    this.linhVucService.getTreeUnits().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu này không hợp lệ.");
      } else {
        this.donViTree = this.transformJsonCustomStructure(data.objData);
      }
    }, (error) => {
      console.log("Lỗi", error);
    })
  }

  onSelectDepart(id: any) {
    this.linhVucService.getDataDepart(id).subscribe(data => {
      if (data.isError) {
        console.log("Dự liệu không hợp lệ");
      } else {
        this.phongBan = data.objData;
        console.log(this.phongBan);
      }
    }, (error) => {
      console.log('Lỗi', error);
    })
  }

  DuLieuMotLoaiHoSo() {
    this.loaiHoSoService.getIdRecord(this.id).subscribe(data => {
      console.log(data);
      this.donViId = data.donViId;
      const objDonVi = this.filterItems(this.donViTree);
      data.donViId = objDonVi;  
      this.phongBanId = data.phongBanId;
      this.onSelectDepart(this.donViId);
      this.formCapNhat.setValue(data);
    })
  }

  public filterItems(donViTree: DMJsonModel[]) {
    let filteredItems = [];

    donViTree.forEach(item => {
      if (item.id === this.donViId) {
        filteredItems.push(item);
      }

      if (item.id) {
        const nestedItems = this.filterItems(item.children);
        filteredItems = filteredItems.concat(nestedItems);
      }
    });

    return filteredItems;
  }


  tatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();
  }

  onSelectChangeDonVi(event: any) {
    if (event) {
      const id = event.id;
      this.linhVucService.getDataDepart(id).subscribe(data => {
        if (data.isError) {
          console.log("Dự liệu không hợp lệ");
        } else {
          this.phongBan = data.objData;
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

  capNhatLoaiHoSo() {
    this.valueFormCapNhat = this.formCapNhat.value;
    this.submitted = true;

    if (this.valueFormCapNhat.donViId.id) {
      this.formCapNhat.value.donViId = this.valueFormCapNhat.donViId.id;
    } else if (this.valueFormCapNhat.donViId[0].id) {
      this.formCapNhat.value.donViId = this.valueFormCapNhat.donViId[0].id;
    }

    this.formCapNhat.value.phongBanId = this.valueFormCapNhat.phongBanId ?? 0;
    this.formCapNhat.value.hienThi = true;
    // console.log("origin:", this.formCapNhat.value);
    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.loaiHoSoService.updateRecord(this.formCapNhat.value, this.id).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      });
    }
    // this.department = [];
    this.tatPopup();
  }
}
