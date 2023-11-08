import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-den/cap-nhat-moi/cap-nhat-moi.service';

@Component({
  selector: 'app-cap-nhat-moi',
  templateUrl: './cap-nhat-moi.component.html',
  providers: [MessageService]
})

export class CapNhatMoiComponent implements OnInit {
  items: any[] = [];
  home: any;

  //Khai báo sổ văn bản option
  SoVanBan = [];

  //Khai báo loại văn bản option
  LoaiVanBan = [];


  ngOnInit() {
    this.items = [{ label: 'Văn bản đến' }, { label: 'Cập nhật mới' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.GetDataSoVanBan();
  }

  constructor(
    private messageService: MessageService,
    private capnhatmoiService: CapNhatMoiService,
  ) { }

  /**
   * lấy dữ liệu bản ghi cập nhật mới
   */
  public GetDanhSachCapNhatMoi() {

  }

  public GetDataSoVanBan() {
    this.capnhatmoiService.GetDataSoVanBan().subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        console.log(data.objData);
        this.SoVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * onChange LoaiVanBan
   */
  public onChangeLoaiVanBan(event: any) {
    var IdSoVanBan = event.id;
    this.capnhatmoiService.GetDataLoaiVanBanByIdSoVanBan(IdSoVanBan).subscribe(data => {
      if (data.isError) {
        console.log("Dữ liệu không hợp lệ")
      } else {
        this.LoaiVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }


}
