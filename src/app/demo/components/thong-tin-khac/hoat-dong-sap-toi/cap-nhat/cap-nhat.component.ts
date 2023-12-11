import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { HoatDongSapToiService } from 'src/app/demo/service/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    noiDung: ["", []],
    ngayDienRa: [Date, []],
    donViId: [0, []],
    created: [, []],
    createdBy: [, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
    thuTu: [, []],
  });
  valueForm: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private hoatDongSapToiService: HoatDongSapToiService,
  ) { }

  ngOnInit(): void {
      
  }

  GetHoatDong() {
    this.hoatDongSapToiService.getHoatDong(this.id).subscribe(
      data => {        
        data.ngayDienRa = new Date(data.ngayDienRa)
        this.formCapNhat.setValue(data);
      }
    )
  }

  CapNhat() {
    this.submitted = true;
    this.valueForm = this.formCapNhat.value;
    this.valueForm.donViId = this.authService.GetDonViLamViec();
    // this.valueForm.create = this.authService.GetmUserInfo().userId;
    this.valueForm.lastModifiedBy = this.authService.GetmUserInfo().userId;
    console.log(this.formCapNhat.value);
    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.hoatDongSapToiService.capNhat(this.formCapNhat.value).subscribe(
        data => {
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
    this.formCapNhat.reset();
  }
}
