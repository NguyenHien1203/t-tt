import { Component, OnInit } from '@angular/core';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { LienKet, TimKiemDanhSach } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lien-ket',
  templateUrl: './lien-ket.component.html',
  styleUrls: ['./lien-ket.component.scss'],
  providers: [MessageService]
})


export class LienKetComponent implements OnInit {

  constructor(private service: LienKetService, private messageService: MessageService) { }

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  items: any[] = [];
  id: any = "";
  home: any;
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
    this.items = [{ label: 'Danh mục' }, { label: 'Liên kết' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }
  LoadDanhSach(timKiemDanhSach: TimKiemDanhSach) {
    this.service.getDanhSachDmLienKet(timKiemDanhSach).then(data => { this.lienKets = data })
  }

  public ThemMoi(): void{
    this.hienThiThemMoi = true;
  }

  public CapNhat(id: string): void{
    this.hienThiCapNhat = true;
    this.id = id;
  }
  saveProduct() {
    // this.submitted = true;
    // if (this.lienKet.tenHienThi?.trim()) {
    //   if (this.lienKet.id) {
    //     this.lienKets[this.findIndexById(this.lienKet.id)] = this.lienKet;
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //   } else {
    //     this.lienKets.push(this.lienKet);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //   }

    //   this.lienKets = [...this.lienKets];
    //   this.lienKetDialog = false;
    //   this.lienKet = {};
    // }
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

}
