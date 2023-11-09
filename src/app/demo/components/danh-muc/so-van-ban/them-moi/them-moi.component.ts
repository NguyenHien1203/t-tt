import { SoVanBanService } from 'src/app/demo/service/danh-muc/so-van-ban/so-van-ban.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss'],
  // providers: [MessageService]
})
export class ThemMoiComponent implements OnInit {

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  submitted = false;
  public formThemMoi = this.formBuilder.group({
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

  ngOnInit(): void {
    console.log(this.authService.GetmUserInfo());
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formThemMoi.reset();
  }

  ThemMoi() {
    this.submitted = true;
    this.formThemMoi.value.id = 0;
    this.formThemMoi.value.donViId = Number(this.authService.GetmUserInfo().donViId);
    this.formThemMoi.value.phongBanId = Number(this.authService.GetmUserInfo().phongBanId);
    this.formThemMoi.value.createdBy = Number(this.authService.GetmUserInfo().donViId);
    this.formThemMoi.value.lastModifiedBy = Number(this.authService.GetmUserInfo().donViId);
    this.formThemMoi.value.created = new Date();
    this.formThemMoi.value.lastModified = new Date();
    console.log(this.formThemMoi.value);
    if (this.formThemMoi.valid) {
      this.soVanBanService.themMoiSoVanBan(this.formThemMoi.value).subscribe(data => {
        if (data.isError) {
          console.log(data);
          
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      });
      this.TatPopup();
    }
  }
}
