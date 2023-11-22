import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
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

  constructor(
    private service: ButPheVanBanService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
) {}

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
  }

  /**
   * GetDataVanBan
   */
  public GetDataVanBan(idVanBan : string) {
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

}
