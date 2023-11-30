import { QuanLyThamDoYKienService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Input() id: string;

  submitted = false;
  public formCapNhat = this.formBuilder.group({
    id: [0, []],
    noiDung: ["", [Validators.required]],
    thuTu: [0, []],
    donViId: [0, []],
    hienThi: ["", []],
    created: [, []],
    createdBy: [, []],
    lastModified: [new Date(), []],
    lastModifiedBy: [0, []],
    ghiChu: [, []],
    chonNhieu: [, []],
    soLuongKhaoSat: [],
    ngayBd: [],
    ngayKt: [],
    cauHoiThamDoUsers: [],
    cauTraLoiThamDos: [],
  });
  valueForm: any;
  hienThi: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private quanLyThamDoYKienService: QuanLyThamDoYKienService
  ) { }

  ngOnInit(): void {

  }

  CheckHT() {
    this.hienThi = !this.hienThi;
  }

  TatPopup() {
    this.submitted = false;
    this.show = false;
    this.close.emit(this.show);
    this.formCapNhat.reset();

  }

  GetThamDoYKien() {
    this.quanLyThamDoYKienService.getThamDoCauHoi(this.id).subscribe(
      data => {
        this.formCapNhat.setValue(data);
      }
    )
  }

  CapNhat() {
    this.submitted = true;
    this.valueForm = this.formCapNhat.value;
    this.valueForm.donViId = this.authService.GetDonViLamViec();
    this.valueForm.lastModifiedBy = this.authService.GetDonViLamViec();
    if (this.formCapNhat.valid) {
      this.submitted = true;
      this.quanLyThamDoYKienService.capNhat(this.formCapNhat.value).subscribe(
        data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.TatPopup();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
          }
        },
        error => {
          console.log('Error', error);
        }
      )
    }
  }
}
