import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { XuLyCongViecService } from 'src/app/demo/service/cong-viec/xu-ly-cong-viec.service';

@Component({
  selector: 'app-giao-viec',
  templateUrl: './giao-viec.component.html',
  styleUrls: ['./giao-viec.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GiaoViecComponent implements OnInit {
  hienThiCapNhat: boolean = false;
  hienThiThemMoi: boolean = false;
  stt: string = '1';
  item: any = [];
  idCongViec: string = '0';
  idCap: string = '0';
  items = [
    { label: 'Công việc' },
    { label: 'Xử lý công việc' },
    { label: 'Giao việc' },
  ];
  home = { icon: 'pi pi-home', routerLink: '/' };

  loading: boolean = true;
  submitted: boolean = false;
  ThongTinVanBan: any;
  ThongTinCongViec: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: XuLyCongViecService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id'] != undefined)
        this.idCongViec = params['id'];

      if (params['cap'] != undefined)
        this.idCap = params['cap'];
    });
    this.GetDataVanBan();
    this.LoadDataDefault();
  }

  public QuayLai() {
    this.router.navigate(['./cong-viec/xu-ly-cong-viec']);
  }

  /**
   * name
   */
  public GetDataVanBan() {
    this.service.GetVanBanById(this.idCongViec).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinVanBan = data.objData;
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public GetDataParent(): any[] {
    return this.ThongTinCongViec.filter(s => s.idParent === "" || s.idParent === null);
  }

  /**
   * name
   */
  public GetDataChild(parentItem: any): any[] {
    return this.ThongTinCongViec.filter(s => s.idParent !== "" && s.idParent === parentItem.idChild);
  }

  public LoadDataDefault() {
    this.service.LoadDataDefault(this.idCongViec, this.idCap).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinCongViec = data.objData;
      }
    }, (error) => {

    })
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'C')
      this.hienThiThemMoi = false;

    if (loai === 'T')
      this.hienThiCapNhat = false;

    this.LoadDataDefault();
  }

  public CreateCongViec(stt: string) {
    this.hienThiThemMoi = true;
    this.stt = stt;
  }

  public UpdateParent(congviec: any) {
    this.hienThiCapNhat = true;
    this.item = congviec;
  }

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
            this.GetDataVanBan();
            this.LoadDataDefault();
          }
        }, (error) => {
          console.log('Error', error);
        })
      },
      reject: () => {

      }
    });
  }
}
