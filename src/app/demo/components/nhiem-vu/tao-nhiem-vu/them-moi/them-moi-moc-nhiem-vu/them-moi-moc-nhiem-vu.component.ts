import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TaoNhiemVuService } from 'src/app/demo/service/nhiem-vu/tao-nhiem-vu.service';

@Component({
  selector: 'app-them-moi-moc-nhiem-vu',
  templateUrl: './them-moi-moc-nhiem-vu.component.html',
  styleUrls: ['./them-moi-moc-nhiem-vu.component.scss']
})
export class ThemMoiMocNhiemVuComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() stt: any;
  @Output() dataMocNhiemVu = new EventEmitter<any>();

  constructor(
    private messageService: MessageService,
    private service: TaoNhiemVuService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  mocNhiemVu: any = {
    stt: 0,
    thoiHanHoanThanh: "",
    ketQuaDuKien: "",
    noiDung: "",
  }

  addProductDialog: boolean = false;

  ThemMoiMocNhiemVU() {
    this.addProductDialog = true;
  }

  XacNhan() {
    this.mocNhiemVu.stt = this.stt + 1;
    if (this.mocNhiemVu.thoiHanHoanThanh != "") {
      this.dataMocNhiemVu.emit(this.mocNhiemVu);
      this.mocNhiemVu = {
        stt: 0,
        thoiHanHoanThanh: "",
        ketQuaDuKien: "",
        noiDung: "",
      }
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới mốc nhiệm vụ thành công', life: 3000 });
      this.addProductDialog = false;
      this.TatPopup();
    } else {
      this.addProductDialog = false;
      this.TatPopup();
    }
  }

  TamDung() {
    this.addProductDialog = false;
  }

  TatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}
