import { QuanLyThamDoYKienService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { CauTraLoiThamDo } from 'src/app/models/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien';

@Component({
  selector: 'app-dap-an',
  templateUrl: './dap-an.component.html',
  styleUrls: ['./dap-an.component.scss']
})
export class DapAnComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  danhSach: CauTraLoiThamDo[] = [];
  cauTraLoi: CauTraLoiThamDo = {};

  idDonVi = this.authService.GetDonViLamViec();
  submitted = false;
  public formThemMoiCauHoi = this.formBuilder.group({
    id: [0, []],
    noiDung: ["", [Validators.required]],
    thuTu: [0, []],
    hienThi: [, []],
    ghiChu: ["CTL"],
    cauHoiId: [0, []],
    thuTuHienThiCauHoi: [],
    createdBy: [],
    donViId: [],
    created: [new Date(), []],
    lastModified: [new Date(), []],
    lastModifiedBy: [],
  })
  valueForm: any;
  hienThi: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private quanLyThamDoYKienService: QuanLyThamDoYKienService
  ) { }

  ngOnInit(): void {

  }

  CheckHT() {
    this.hienThi = !this.hienThi;
  }

  GetCauHoiThamDo() {
    this.quanLyThamDoYKienService.getDanhSachCauHoi(this.id, this.idDonVi).subscribe(
      data => {
        if (data.obj) {
          this.danhSach = data.obj;
          this.formThemMoiCauHoi.patchValue({
            thuTuHienThiCauHoi: data.maxThuTu + 1,
          });
        } else {
          this.formThemMoiCauHoi.patchValue({
            thuTuHienThiCauHoi: 1,
          });
        }
      }
    )
  }

  ThemMoiCauTraLoi() {

    this.submitted = true;
    this.valueForm = this.formThemMoiCauHoi.value;
    this.valueForm.cauHoiId = this.id;
    this.valueForm.donViId = this.authService.GetDonViLamViec();
    this.valueForm.createdBy = this.authService.GetDonViLamViec();
    this.valueForm.lastModifiedBy = this.authService.GetDonViLamViec();
    
    if (this.formThemMoiCauHoi.valid) {
      this.submitted = true;
      this.quanLyThamDoYKienService.themMoiCauTraLoi(this.formThemMoiCauHoi.value).subscribe(data => {
        let resData = data;
        if (resData.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
        } else {
          this.TatPopup();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
        }
      },
        error => {
          console.log('Error', error);
        }
      )
    }
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    // this.formCapNhat.reset();
  }
}
