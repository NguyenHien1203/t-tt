import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { FormBuilder, Validators } from '@angular/forms';
import { LoaiVanBanDi } from 'src/app/models/danh-muc/loai-van-ban-di';
import { LoaiVanBanDiService } from 'src/app/demo/service/danh-muc/loai-van-ban-di/loai-van-ban-di.service';

@Component({
  selector: 'app-loai-van-ban-di',
  templateUrl: './loai-van-ban-di.component.html',
  styleUrls: ['./loai-van-ban-di.component.scss'],
  providers: [MessageService]
})
export class LoaiVanBanDiComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  soVanBan: {} = {};
  msgs: Message[] = [];
  idSoVB: number;
  loaiVBDi: LoaiVanBanDi[] = [];
  loaiVbDi: LoaiVanBanDi = {};
  checkId: number;

  submitted = false;

  ngOnInit() {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản trị loại văn bản đi' });

    this.GetSoVanBan();
  }

  constructor(private messageService: MessageService, private authService: AuthService, private loaiVBDiService: LoaiVanBanDiService, private fb: FormBuilder) { }

  GetSoVanBan() {
    this.loaiVBDiService.getSoVanBan(this.authService.GetmUserInfo().donViId).subscribe(data => {
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
    if (this.idSoVB > 0) {
      this.submitted = true;
      this.checkId = this.idSoVB;
      this.loaiVBDiService.getLoaiVBDonVi(this.idSoVB).subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.loaiVBDi = data;
        };
      }, (error) => {
        console.log('Error', error);
      })
    }
  }

  UpdateLoaiVBDi() {
    if (this.idSoVB == this.checkId && this.idSoVB > 0) {
      this.submitted = true;
      if (this.submitted == true) {
        this.loaiVBDiService.updateDataVBDen(this.loaiVBDi).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
          }
        })
        this.GetSoVanBan();
      }
    } else {
      this.submitted = false;
    }
  }
}
