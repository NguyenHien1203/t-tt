import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LoaiVanBanService } from 'src/app/demo/service/danh-muc/loai-van-ban/loai-van-ban.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>;
  @Input() id: string = '';

  submitted = false;
  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    maLoaiVb: ["", [Validators.required]],
    tenLoaiVb: ["", [Validators.required]],
    thuTu: [0, []],
    ghiChu: ["", []],
    phanLoai: [2, []],
    hienThi: ["", []],
    created: [new Date(), []],
    createdBy: [0, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
    donViId: [0, []],
  });

  checked: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private loaiVanBanService: LoaiVanBanService, private messageService: MessageService) { }

  ngOnInit() {

  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();
  }

  GetLoaiVanBan() {
    this.loaiVanBanService.getLoaiVanBan(this.id).subscribe(data => {
      this.formCapNhat.setValue(data);
    });
  }

  CapNhat() {
    this.submitted = true;
    this.formCapNhat.value.lastModified = new Date();
    this.formCapNhat.value.lastModifiedBy = Number(this.authService.GetmUserInfo().donViId);
    this.formCapNhat.value.donViId = Number(this.authService.GetmUserInfo().donViId);
    if (this.formCapNhat.valid) {
      this.loaiVanBanService.capNhatLoaiVanBan(this.formCapNhat.value, this.id).subscribe(data => {
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
