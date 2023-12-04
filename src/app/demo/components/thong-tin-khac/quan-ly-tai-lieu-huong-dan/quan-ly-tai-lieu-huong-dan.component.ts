import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyTaiLieuHuongDanService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.service';
import { QuanLyTaiLieuHuongDan, TimKiemQuanLyTaiLieuHuongDan } from 'src/app/models/thong-tin-khac/quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan';

@Component({
  selector: 'app-quan-ly-tai-lieu-huong-dan',
  templateUrl: './quan-ly-tai-lieu-huong-dan.component.html',
  styleUrls: ['./quan-ly-tai-lieu-huong-dan.component.scss'],
  providers: [MessageService]
})
export class QuanLyTaiLieuHuongDanComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  msgs: Message[] = [];

  danhSachQuanLyTaiLieu: QuanLyTaiLieuHuongDan[] = [];
  quanLyTaiLieu: QuanLyTaiLieuHuongDan = {};

  lstDonVi: any = [];

  timKiem: TimKiemQuanLyTaiLieuHuongDan = {
    keyWord: "",
    donViId: this.authService.GetDonViLamViec() ?? "0",
    timChinhXac: 0
  }

  constructor(private messageService: MessageService, private quanLyTaiLieuService: QuanLyTaiLieuHuongDanService, private authService: AuthService,) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản lý tài liệu hướng dẫn' });
    
    this.GetDonVi();
    this.TimKiem();
  }

  GetDonVi() {
    this.quanLyTaiLieuService.getDonVi()
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
    this.quanLyTaiLieuService.getDanhSach(this.timKiem)
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

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } else {
      this.hienThiCapNhat = false;
    }
    this.TimKiem();
  }
}
