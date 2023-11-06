import { Component, OnInit } from '@angular/core';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { LienKet, TimKiemDanhSach } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lien-ket',
  templateUrl: './lien-ket.component.html',
  styleUrls: ['./lien-ket.component.scss'],
  providers: [MessageService, ConfirmationService]
})


export class LienKetComponent implements OnInit {

  constructor(private service: LienKetService
    , private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  items: any[] = [{ label: 'Danh mục' }, { label: 'Liên kết' }];
  id: any = "";
  home: any = { icon: 'pi pi-home', routerLink: '/' };
  lienKetDialog: boolean = false;
  timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    tuNgay: new Date(),
    denNgay: new Date(),
    nam: 0
  };
  lienKets: LienKet[] = [];
  selectedState: any = null;
  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }
  LoadDanhSach(timKiemDanhSach: TimKiemDanhSach) {
    this.service.getDanhSachDmLienKet(timKiemDanhSach).then(data => { this.lienKets = data })
  }

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public Xoa(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xác nhận xóa liên kết?',
      header: 'Xác nhận',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.service.xoaLienKet(id).subscribe(data => {
          if (data.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
          } else {
            this.LoadDanhSach(this.timKiemDanhSach);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
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
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

}
