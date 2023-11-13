import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LoaiVanBanDenService } from 'src/app/demo/service/danh-muc/loai-van-ban-den/loai-van-ban-den.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaiVanBanDen } from 'src/app/models/danh-muc/loai-van-ban-den';

@Component({
  selector: 'app-loai-van-ban-den',
  templateUrl: './loai-van-ban-den.component.html',
  styleUrls: ['./loai-van-ban-den.component.scss'],
  providers: [MessageService]
})
export class LoaiVanBanDenComponent implements OnInit {

  @ViewChild('valueInput') inputName;

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  soVanBan: {} = {};
  msgs: Message[] = [];
  idSoVB: number;
  loaiVBDen: LoaiVanBanDen[] = [];
  loaiVbDen: LoaiVanBanDen = {};


  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị loại văn bản đến' });

    this.GetSoVanBan();
  }

  constructor(private messageService: MessageService, private authService: AuthService, private loaiVBDenService: LoaiVanBanDenService, private fb: FormBuilder) { }

  GetSoVanBan() {
    this.loaiVBDenService.getSoVanBan(this.authService.GetmUserInfo().donViId).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.soVanBan = data.objData;
      };
    }, (error) => {
      console.log('Error', error);
    })
  }

  onChangeLoaiVanBan(event: any) {
    this.idSoVB = event.value;
  }

  GetLoaiVBDV() {
    if (this.idSoVB) {
      this.loaiVBDenService.getLoaiVBDonVi(this.idSoVB).subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.loaiVbDen = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
    }
  }

  UpdateLoaiVBDen() {
    if (this.loaiVbDen.idLoaiVBDV) {
      this.loaiVBDenService.updateDataVBDen(this.loaiVBDen).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      })
      this.GetLoaiVBDV();
    };
  }
}
