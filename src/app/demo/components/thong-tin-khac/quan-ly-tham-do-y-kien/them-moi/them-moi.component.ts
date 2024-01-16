import { QuanLyThamDoYKienService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() maxThuTu: number;

  submitted = false;
  public formThemMoi = this.formBuilder.group({
    noiDung: ["", [Validators.required]],
    thuTu: [0, []],
    donViId: [0, []],
    ghiChu: ["CTL"],
    hienThi: [false, []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });
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

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formThemMoi.reset();

  }

  GetValueThuTu() {
    this.formThemMoi.patchValue({
      thuTu: this.maxThuTu + 1,
    })                                                                                                                                                                              
  }

  ThemMoi() {
    this.submitted = true;
    this.valueForm = this.formThemMoi.value;
    this.valueForm.donViId = this.authService.GetDonViLamViec();
    this.valueForm.createdBy = this.authService.GetDonViLamViec();
    if (this.formThemMoi.valid) {
      this.submitted = true;
      this.quanLyThamDoYKienService.themMoi(this.formThemMoi.value).subscribe(
        data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title, life: 3000 });
          } else {
            this.TatPopup();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title, life: 3000 });
          }
        },
        error => {
          console.log('Error', error);
        }
      )
    }
  }
}
