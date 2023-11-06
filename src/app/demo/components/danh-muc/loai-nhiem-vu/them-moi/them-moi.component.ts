import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LoaiNhiemVuService } from 'src/app/demo/service/danh-muc/loai-nhiem-vu/loai-nhiem-vu.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss'],
  providers : [MessageService]
})
export class ThemMoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder
    , private service : LoaiNhiemVuService
    ,private messageService: MessageService
    ,private authService : AuthService){ }

  public loaiNhiemvu: any = {};
  public submitted : boolean  = false;
  public formThemMoi = this.fb.group({
    id: [0, []],
    tenNhiemVu: ["", [Validators.required]],
    moTa: ["", []],
    donViId: [0, ''],
    ngayTao: [new Date(), ''],
    createdBy: [0, ''],
    tenNguoiTao : ["", ''],
    tenDonVi : ["", ''],
  });

  public Thoat(): void {
  this.hienThi = false;
  this.tatPopup.emit(this.hienThi);
}

public ThemMoi(): void {
  this.submitted = true;
  if (this.formThemMoi.valid) { 
    this.loaiNhiemvu = this.formThemMoi.value;
    this.loaiNhiemvu.donViId = this.authService.GetDonViLamViec();
    this.loaiNhiemvu.createdBy = this.authService.GetmUserInfo()?.userId;

    this.service.themMoiLoaiNhiemVu(this.loaiNhiemvu).subscribe(
      data => {
        let resData = data as ResponeMessage;
        if (resData.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
          this.Thoat();
        }
      },
      error => {
        console.log('Error', error);
      })
  }
}

}
