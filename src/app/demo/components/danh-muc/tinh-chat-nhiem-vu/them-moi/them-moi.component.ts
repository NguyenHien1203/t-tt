import { TinhChatNhiemVuService } from './../../../../service/danh-muc/tinh-chat-nhiem-vu/tinh-chat-nhiem-vu.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
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
    ten: ["", [Validators.required]],
    moTa: ["",],
    ngayTao: [new Date(), []],
    createdBy: [0, []],
    tenDonVi: ["", []],
    donViId: [0, []],
    tenNguoiTao: ["", []]
  });
  valueFormCreate: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService, private tinhChatNhiemVuService: TinhChatNhiemVuService) { }

  public TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formThemMoi.reset();
  }

  public ThemMoi() {
    this.submitted = true;
    this.formThemMoi.value.id = 0;
    this.formThemMoi.value.ngayTao = new Date();
    this.formThemMoi.value.createdBy = Number(this.authService.GetmUserInfo().userId) ?? 0;
    this.formThemMoi.value.tenDonVi = this.authService.GetmUserInfo().tenDonVi ?? "";
    this.formThemMoi.value.donViId = Number(this.authService.GetmUserInfo().donViId) ?? 0;
    this.formThemMoi.value.tenNguoiTao = this.authService.GetmUserInfo().fullName ?? "";
    if (this.formThemMoi.valid) {
      this.tinhChatNhiemVuService.themMoiTinhChatNhiemVu(this.formThemMoi.value).subscribe(data => {
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
