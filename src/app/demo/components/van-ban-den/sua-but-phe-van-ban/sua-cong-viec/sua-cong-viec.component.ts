import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataController } from '@ckeditor/ckeditor5-engine';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ButPheVanBanService } from 'src/app/demo/service/van-ban-den/but-phe-van-ban/but-phe-van-ban.service';
import { SuaButPheVanBanService } from 'src/app/demo/service/van-ban-den/sua-but-phe-van-ban/sua-but-phe-van-ban.service';

@Component({
  selector: 'app-sua-cong-viec',
  templateUrl: './sua-cong-viec.component.html',
  styleUrls: ['./sua-cong-viec.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SuaCongViecComponent implements OnInit {
  hienThiCapNhat: boolean = false;
  hienThiThemMoi: boolean = false;
  hienThiThemLich: boolean = false;

  item: any = [];
  idVanBan: string = '1';
  stt: string = '1';
  items: any[] = [];
  home: any;
  loading: boolean = true;
  submitted: boolean = false;
  ThongTinVanBan: any;
  ThongTinCongViec: any[] = [];

  constructor(
    private service: SuaButPheVanBanService,
    private butpheService: ButPheVanBanService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private router: Router,
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


  ngAfterContentChecked(): void {
    this.cd.detectChanges();
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
      }
    }, (error) => {

    })
  }

  public CreateCongViec(stt: string) {
    this.hienThiThemMoi = true;
    this.stt = stt;
  }

  /**
   * GetDataParent
   */
  public GetDataParent(): any[] {
    return this.ThongTinCongViec.filter(s => s.idParent === "" || s.idParent === null);
  }

  /**
   * name
   */
  public GetDataChild(parentItem: any): any[] {
    return this.ThongTinCongViec.filter(s => s.idParent !== "" && s.idParent === parentItem.idChild);
  }


  public UpdateParent(congviec: any) {
    this.hienThiCapNhat = true;
    this.item = congviec;
  }

  /**
   * DeleteParent
   */
  public DeleteParent(idChiTieu: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa chỉ tiêu công việc?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.XoaCongViec(idChiTieu).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
            this.GetDataVanBan(this.idVanBan);
            this.LoadDataDefault(this.idVanBan);
          }
        }, (error) => {
          console.log('Error', error);
        })
      },
      reject: () => {

      }
    });
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiCapNhat = false;

    if (loai === 'C')
      this.hienThiThemMoi = false;

    if (loai === 'TL')
      this.hienThiThemLich = false;

    this.GetDataVanBan(this.idVanBan);
    this.LoadDataDefault(this.idVanBan);
  }
  /**
   * QuayLai
   */
  public QuayLai() {
    this.router.navigate(['/van-ban-den/sua-but-phe-van-ban']);
  }

  public ThemLich() {
    this.hienThiThemLich = true;
  }
}


