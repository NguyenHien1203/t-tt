import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tiep-nhan-van-ban',
  templateUrl: './tiep-nhan-van-ban.component.html',
  styleUrls: ['./tiep-nhan-van-ban.component.scss'],
  providers: [MessageService]

})
export class TiepNhanVanBanComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Tiếp nhận văn bản' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
