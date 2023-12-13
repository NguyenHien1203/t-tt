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
  providers: [MessageService],
})
export class QuanLyThamDoYKienComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  hienThiDapAn: boolean = false;
  msgs: Message[] = [];

  danhSach: QuanLyThamDoYKien[] = [];
  quanLyThamDo: QuanLyThamDoYKien = {};
  idYKien: any;
  idCapNhat: any;
  idDapAn: any;

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

  Xoa(id: any) {
    this.deleteProductDialog = true;
    this.idYKien = id;
    console.log(this.idYKien);
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idYKien = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.quanLyThamDoYKienService.xoa(this.idYKien).subscribe(
      data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.TimKiem();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      }
    )
  }

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhat(id: any) {
    this.hienThiCapNhat = true;
    this.idCapNhat = id;
  }

  DapAn(id: any){
    this.hienThiDapAn = true;
    this.idDapAn = id;
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } else if (type === 'U') {
      this.hienThiCapNhat = false;
    } else if (type === 'D') {
      this.hienThiDapAn = false;
    }
    this.TimKiem();
  }
}
