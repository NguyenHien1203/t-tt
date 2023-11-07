import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cap-nhat-moi',
  templateUrl: './cap-nhat-moi.component.html',
  styleUrls: ['./cap-nhat-moi.component.scss'],
  providers: [MessageService]
})
export class CapNhatMoiComponent implements OnInit {
  items: any[] = [];
  home: any;
  ngOnInit() {
    this.items = [{ label: 'Văn bản đến' }, { label: 'Cập nhật mới' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
  }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachCapNhatMoi() {
    
  }
}
