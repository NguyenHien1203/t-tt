import { ThamDoYKien } from './../../../../models/thong-tin-khac/tham-do-y-kien';
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ThamDoYKienService } from 'src/app/demo/service/thong-tin-khac/tham-do-y-kien/tham-do-y-kien.service';

@Component({
  selector: 'app-tham-do-y-kien',
  templateUrl: './tham-do-y-kien.component.html',
  styleUrls: ['./tham-do-y-kien.component.scss'],
  providers: [MessageService],
})
export class ThamDoYKienComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  msgs: Message[] = [];
  checkCTL: number = 0;

  lstCauHoi: any[];
  lstCauTraLoi: any[];
  lstCauHoiCoCTL: any[] = [];
  lstCTLCoCH: any[] = [];

  constructor(
    private messageService: MessageService,
    private thamDoYKienService: ThamDoYKienService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Thông tin khác' });
    this.breadcrumbItems.push({ label: 'Thăm dò ý kiến' });

    this.GetDanhSachYKien();
  }

  GetDanhSachYKien() {
    this.thamDoYKienService.getDanhSachYKien().subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        this.lstCauHoi = data.objData.lstCauHoi;
        this.lstCauTraLoi = data.objData.lstCauTraLoi;
      };
    }, (error) => {
      console.log('Error', error);
    })
  }
}
