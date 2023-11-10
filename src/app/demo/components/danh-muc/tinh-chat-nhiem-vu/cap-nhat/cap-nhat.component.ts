import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TinhChatNhiemVuService } from './../../../../service/danh-muc/tinh-chat-nhiem-vu/tinh-chat-nhiem-vu.service';

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
    ten: ["", [Validators.required]],
    moTa: ["",],
    tenDonVi: ["", []],
    donViId: [0, []],
  });
  valueFormCreate: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService, private tinhChatNhiemVuService: TinhChatNhiemVuService) { }

  public TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();
  }

  GetDataTinhChat() {
    this.tinhChatNhiemVuService.getTinhChatNhiemVu(this.id).subscribe(data => {
      console.log(data);
      this.formCapNhat.setValue(data);
    })
  }

  CapNhat() {
    this.submitted = true;
    this.formCapNhat.value.tenDonVi = this.authService.GetmUserInfo().tenDonVi ?? "";
    this.formCapNhat.value.donViId = Number(this.authService.GetmUserInfo().donViId) ?? 0;
    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.tinhChatNhiemVuService.capNhatTinhChatNhiemVu(this.formCapNhat.value, this.id).subscribe(data => {
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
