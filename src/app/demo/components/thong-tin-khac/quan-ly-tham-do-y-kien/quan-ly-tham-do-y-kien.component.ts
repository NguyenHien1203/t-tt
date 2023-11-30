import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyThamDoYKienService } from 'src/app/demo/service/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien.service';
import { QuanLyThamDoYKien, TimKiemQuanLyThamDoYKien } from 'src/app/models/thong-tin-khac/quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien';

@Component({
  selector: 'app-quan-ly-tham-do-y-kien',
  templateUrl: './quan-ly-tham-do-y-kien.component.html',
  styleUrls: ['./quan-ly-tham-do-y-kien.component.scss'],
  providers: [MessageService]
})
export class QuanLyThamDoYKienComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  msgs: Message[] = [];

  danhSach: QuanLyThamDoYKien[] = [];
  quanLyThamDo: QuanLyThamDoYKien = {};

  timKiem: TimKiemQuanLyThamDoYKien = {
    noiDung: "",
    donViId: Number(this.authService.GetDonViLamViec()) ?? 0,
    timChinhXac: 0
  }
  timchinhXac: boolean = false;

  maxThuTu: number = 0;

  constructor(private messageService: MessageService, private quanLyThamDoYKienService: QuanLyThamDoYKienService, private authService: AuthService,) { } 
  
  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Danh mục' });
    this.breadcrumbItems.push({ label: 'Quản lý thăm dò ý kiến' });
    this.TimKiem();
  }

  CheckCX() {
    this.timchinhXac = !this.timchinhXac;
  }

  TimKiem() {
    this.timKiem.timChinhXac = this.timchinhXac ? 1 : 0;
    
    this.quanLyThamDoYKienService.getDanhSach(this.timKiem)
    .subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.danhSach = data.lst;     
        this.maxThuTu = data.max;
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
