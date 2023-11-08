import { LoaiVanBanService } from './../../../service/danh-muc/loai-van-ban/loai-van-ban.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { Search } from 'src/app/models/danh-muc/search.model';

@Component({
  selector: 'app-loai-van-ban',
  templateUrl: './loai-van-ban.component.html',
  styleUrls: ['./loai-van-ban.component.scss'],
  providers: [MessageService]
})
export class LoaiVanBanComponent implements OnInit {

  constructor(private messageService: MessageService, private loaiVanBanService: LoaiVanBanService) { }

  msgs: Message[] = [];

  ngOnInit() {
    this.DanhSachLoaiVanBan();
  }

  dataSearch = {
    "keyWord": "",
    "maLoaiVanBan": "",
    "phanLoai": 2,
    "timChinhXac": 0
  };

  DanhSachLoaiVanBan() {
    this.loaiVanBanService.getDanhSachLoaiVanBan(this.dataSearch)
      .subscribe(data => {
        if (data.isError) {
          this.msgs = [];
          this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
        } else {
          console.log(data);

        };
      }, (error) => {
        console.log('Error', error);
      })
  }
}

