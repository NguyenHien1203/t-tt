import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LoaiVanBanService } from 'src/app/demo/service/danh-muc/loai-van-ban/loai-van-ban.service';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;

  submitted = false;
  public formThemMoi = this.formBuilder.group({
    id: [0, []],
    maLoaiVB: ["", [Validators.required]],
    tenLoaiVB: ["", [Validators.required]],
    thuTu: [0, []],
    ghiChu: ["", []],
    phanLoai: [2, []],
    hienThi: ["", []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
  });
  valueFormCreate: any;

  checked: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private loaiVanBanService: LoaiVanBanService, private messageService: MessageService) { }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formThemMoi.reset();
  }

  ThemMoi() {
    this.submitted = true;
    this.formThemMoi.value.id = 0;
    this.formThemMoi.value.created = new Date();
    this.formThemMoi.value.createdBy = Number(this.authService.GetmUserInfo().donViId);
    this.formThemMoi.value.lastModified = new Date();
    this.formThemMoi.value.lastModifiedBy = Number(this.authService.GetmUserInfo().donViId);
    console.log(this.formThemMoi.value);
    if (this.formThemMoi.valid) {
      this.loaiVanBanService.themMoiLoaiVanBan(this.formThemMoi.value).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      });
      this.TatPopup();
      this.formThemMoi.reset();
    }
  }
}
