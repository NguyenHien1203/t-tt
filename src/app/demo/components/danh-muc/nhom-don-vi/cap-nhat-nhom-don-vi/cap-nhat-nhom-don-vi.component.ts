import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NhomDonViService } from 'src/app/demo/service/danh-muc/nhom-don-vi/nhom-don-vi.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-cap-nhat-nhom-don-vi',
  templateUrl: './cap-nhat-nhom-don-vi.component.html',
  styleUrls: ['./cap-nhat-nhom-don-vi.component.scss']
})
export class CapNhatNhomDonViComponent {
  constructor(private route: ActivatedRoute, private Service: NhomDonViService, private formBuilder: FormBuilder, private messageService: MessageService) { }
  //Lấy dữ liệu đầu vào
  @Input() id: string = '';
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();


  //#region Khao báo form cập nhât
  submitted = false;
  NhomDonVi: any = {};

  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    thuTu: ["", []],
    tenNhom: ["", [Validators.required]],
    moTa: ["", []],
  });
  //#endregion

  //Hàm đóng pop up
  public Thoat(): void {
    this.hienThi = false;
    this.submitted = false;
    this.tatPopup.emit(this.hienThi);
  }

  //#region bind dữ liệu cần chỉnh sửa
  public BindDataDialog(): void {
    this.Service.GetNhomDonViById(this.id).subscribe(data => {
      this.formCapNhat.setValue(data);
    })
  }
  //#endregion

  //#region CapNhat NhomDonVi
  public CapNhatCoQuan(): void {
    this.submitted = true;
    if (this.formCapNhat.valid) {
      this.NhomDonVi = this.formCapNhat.value;
      this.Service.CapNhatNhomDonVi(this.NhomDonVi).subscribe(
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

  //#endregion
}
