import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoVanBanService } from 'src/app/demo/service/danh-muc/so-van-ban/so-van-ban.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  // providers: [MessageService]
})
export class CapNhatComponent {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;
  @Input() id: string = '';

  submitted = false;
  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    tenSo: ["", [Validators.required]],
    maSo: ["", [Validators.required]],
    thuTu: [0, []],
    loai: ["", []],
    soDiDenHt: [0, []],
    soDiDenTruoc: [0, []],
    phongBanId: [0, []],
    donViId: [0, []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });
  valueFormCreate: any;

  checked: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private soVanBanService: SoVanBanService, private messageService: MessageService) { }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();
  }

  GetSoVanBan() {
    this.soVanBanService.getSoVanBan(this.id).subscribe(data => {
      this.formCapNhat.setValue(data);
    });
  }

  CapNhat() {
    this.submitted = true;
    this.formCapNhat.value.lastModified = new Date();
    this.formCapNhat.value.lastModifiedBy = Number(this.authService.GetmUserInfo().donViId);
    this.formCapNhat.value.donViId = Number(this.authService.GetmUserInfo().donViId);
    this.formCapNhat.value.phongBanId = Number(this.authService.GetmUserInfo().phongBanId);
    if (this.formCapNhat.valid) {
      this.soVanBanService.capNhatSoVanBan(this.formCapNhat.value, this.id).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      });
    }
    this.TatPopup();
  }
}
