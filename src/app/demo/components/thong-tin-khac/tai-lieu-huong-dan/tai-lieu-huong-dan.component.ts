import { TaiLieuHuongDanService } from './../../../service/thong-tin-khac/tai-lieu-huong-dan/tai-lieu-huong-dan.service';
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TaiLieuHuongDan, TimKiemTaiLieuHuongDan } from 'src/app/models/thong-tin-khac/tai-lieu-huong-dan/tai-lieu-huong-dan';

@Component({
  selector: 'app-tai-lieu-huong-dan',
  templateUrl: './tai-lieu-huong-dan.component.html',
  styleUrls: ['./tai-lieu-huong-dan.component.scss'],
  providers: [MessageService]
})
export class TaiLieuHuongDanComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];

  lstDonVi: any = [];
  danhSachQuanLyTaiLieu: TaiLieuHuongDan[] = [];
  quanLyTaiLieu: TaiLieuHuongDan = {};

  timKiem: TimKiemTaiLieuHuongDan = {
    keyWord: "",
    donViId: this.authService.GetDonViLamViec() ?? "0",
    timChinhXac: 0
  }

  constructor(private messageService: MessageService, private authService: AuthService, private taiLieuHuongDanService : TaiLieuHuongDanService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Tài liệu hướng dẫn' });
    
    this.GetDonVi();
    this.TimKiem();
  }

  GetDonVi() {
    this.taiLieuHuongDanService.getDonVi()
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          this.lstDonVi = data;          
        };
      }, (error) => {
        console.log('Error', error);
      })
  }

  TimKiem() {
    this.taiLieuHuongDanService.getDanhSach(this.timKiem)
    .subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.danhSachQuanLyTaiLieu = data;
        console.log(data);      
      };
    }, (error) => {
      console.log('Error', error);
    })
  }
}
