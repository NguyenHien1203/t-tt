import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QlyCviecPsinhService } from 'src/app/demo/service/cong-viec/qly-cviec-psinh/qly-cviec-psinh.service';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CapNhatComponent implements OnInit {
  hienThiCapNhat: boolean = false;
  hienThiThemMoi: boolean = false;

  item: any = [];
  idCongViec: string = '1';
  stt: string = '1';
  items: any[] = [];
  home: any;
  loading: boolean = true;
  submitted: boolean = false;
  ThongTinVanBan: any;
  ThongTinCongViec: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private service: QlyCviecPsinhService,

  ) { }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Cập nhật công việc' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.route.queryParams.subscribe((params) => {
      if (params['idCongViec'] != undefined) {
        this.idCongViec = params['idCongViec'];
      }
    });
    this.LoadDataDefault(this.idCongViec);
  }


  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  public LoadDataDefault(idCongViec: string) {
    this.service.LoadDataDefault(idCongViec).subscribe(data => {
      if (data.isError) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
      } else {
        this.ThongTinCongViec = data.objData;

      }
    }, (error) => {

    })
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

  public QuayLai() {
    this.router.navigate(['/cong-viec/qly-cviec-psinh']);
  }

  public CreateCongViec(stt: string) {
    this.hienThiThemMoi = true;
    this.stt = stt;
  }

  public UpdateParent(congviec: any) {
    this.hienThiCapNhat = true;
    this.item = congviec;
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'C')
      this.hienThiThemMoi = false;

    if (loai === 'T')
      this.hienThiCapNhat = false;

    this.LoadDataDefault(this.idCongViec);
  }
}
