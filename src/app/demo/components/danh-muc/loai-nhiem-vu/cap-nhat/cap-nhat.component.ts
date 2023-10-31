import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoaiNhiemVuService } from 'src/app/demo/service/danh-muc/loai-nhiem-vu/loai-nhiem-vu.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  providers: [MessageService]
})
export class CapNhatComponent {
  constructor(private service: LoaiNhiemVuService
    , private messageService: MessageService
    , private fb: FormBuilder) { };

  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  submitted: boolean = false;
  checked: boolean = false;
  lienKet: any = {};

  public formCapNhat = this.fb.group({
    id: [0, []],
    tenLoaiNhiemVu: ["", [Validators.required]],
    moTa: ["", []],
    donViId: [0, ''],
  });

  public BindDataDialog(): void {
    this.service.getLoaiNhiemVuId(this.id).subscribe(data => {
      let itemData = data;
      this.checked = itemData?.hienThi;
      this.formCapNhat.setValue(data);
    })
  }

  public Thoat(): void {
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  public CapNhat(): void {
    this.submitted = true;
    if (this.formCapNhat.valid) {
      this.lienKet = this.formCapNhat.value;
      console.log(this.lienKet)
      this.service.capNhatLoaiNhiemVu(this.lienKet).subscribe(
        data => {
          console.log('data', data);
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
