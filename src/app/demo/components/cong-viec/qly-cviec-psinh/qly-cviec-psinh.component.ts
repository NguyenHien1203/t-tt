import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { QlyCviecPsinhService } from 'src/app/demo/service/cong-viec/qly-cviec-psinh/qly-cviec-psinh.service';
import { TimKiemDanhSach } from 'src/app/models/cong-viec/qly-cviec-psinh';

@Component({
  selector: 'app-qly-cviec-psinh',
  templateUrl: './qly-cviec-psinh.component.html',
  styleUrls: ['./qly-cviec-psinh.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class QlyCviecPsinhComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  lstTrangThai: SelectItem[] = [
    { label: 'Chưa xử lý', value: '3' },
    { label: 'Đang xử lý', value: '4' },
    { label: 'Xử lý xong', value: '5' },
  ];

  lstCongViec: any[] = [];
  public timKiemDanhSach: TimKiemDanhSach = {
    idUser: "",
    trangThai: "",
    noiDung: "",
    vanBan: "",
    chuTri: "",
  }

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private service: QlyCviecPsinhService,

  ) { }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Quản lý công việc phát sinh' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.GetDanhSachCongViec()
  }

  public GetDanhSachCongViec() {
    this.service.GetDanhSachCongViec(this.timKiemDanhSach).subscribe(data => {
      if (data.isError) {

      } else {
        this.lstCongViec = data.objData;
        console.log( this.lstCongViec)
      }
    }, (error) => {
      console.log('Error', error);
    })
  }

  public ThemMoi(){
    this.router.navigate(['/cong-viec/them-moi-cong-viec']);
  }

  public Update(idCongViec:string){
    this.router.navigate(['/cong-viec/cap-nhat-cong-viec'], {
      queryParamsHandling: 'merge',
      queryParams: { idCongViec: idCongViec },
    });
  }
}
