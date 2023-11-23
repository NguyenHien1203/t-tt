import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';

@Component({
  selector: 'app-them-moi-cong-viec',
  templateUrl: './them-moi-cong-viec.component.html',
  styleUrls: ['./them-moi-cong-viec.component.scss'],
  providers: [MessageService],
})
export class ThemMoiCongViecComponent implements OnInit {
  idVanBan: string = '1';
  items: any[] = [];
  home: any;
  loading: boolean = true;
  ThongTinVanBan: any;
  lstPhongBan: [];
  lstNhomNguoiDung: [];
  lstNguoiDung: [];

  constructor(
    private service: ButPheVanBanService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Văn bản đến' }, { label: 'Thêm mới công việc' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.route.queryParams.subscribe((params) => {
      if (params['idVanBan'] != undefined) {
        this.idVanBan = params['idVanBan'];
      }
    });

    this.GetDataVanBan(this.idVanBan);
    this.LoadPhongBan();
    this.LoadNhomNguoiDung();
    this.LoadChonNhanhNguoiDung();
  }

  /**
   * GetDataVanBan
   */
  public GetDataVanBan(idVanBan: string) {
    this.service.GetVanBanById(idVanBan).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  /**
   * LoadPhongBan
   */
  public LoadPhongBan() {
    this.service.LoadPhongBan().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstPhongBan = data.objData;
      }
    })
  }

  /**
  * LoadNhomNguoiDung
  */
  public LoadNhomNguoiDung() {
    this.service.LoadNhomNguoiDung().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNhomNguoiDung = data.objData;
      }
    })
  }

  /**
  * LoadChonNhanhNguoiDung
  */
  public LoadChonNhanhNguoiDung() {
    this.service.LoadChonNhanhNguoiDung().subscribe(data => {
      if (data.isError) {
      } else {
        this.lstNguoiDung = data.objData;
      }
    })
  }

}
