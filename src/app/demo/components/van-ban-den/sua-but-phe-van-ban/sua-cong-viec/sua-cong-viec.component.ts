import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataController } from '@ckeditor/ckeditor5-engine';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { SuaButPheVanBanService } from 'src/app/demo/service/van-ban-den/sua-but-phe-van-ban/sua-but-phe-van-ban.service';

@Component({
  selector: 'app-sua-cong-viec',
  templateUrl: './sua-cong-viec.component.html',
  styleUrls: ['./sua-cong-viec.component.scss'],
  providers: [MessageService]
})
export class SuaCongViecComponent implements OnInit {
  idVanBan: string = '1';
  items: any[] = [];
  home: any;
  loading: boolean = true;
  submitted: boolean = false;
  ThongTinVanBan: any;
  ThongTinCongViec : any[] = [];

  constructor(
    private service: SuaButPheVanBanService,
    private butpheService: ButPheVanBanService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
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
    this.LoadDataDefault(this.idVanBan);
  }

  /**
  * GetDataVanBan
  */
  public GetDataVanBan(idVanBan: string) {
    this.butpheService.GetVanBanById(idVanBan).subscribe(data => {
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
   * LoadDataDefault
   */
  public LoadDataDefault(idVanBan: string) {
    this.service.LoadDataDefault(idVanBan).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinCongViec = data.objData;
        console.log(this.ThongTinCongViec);
      }
    }, (error) => {
      
    })
  }

  public ThemCongViec() {

  }
}


