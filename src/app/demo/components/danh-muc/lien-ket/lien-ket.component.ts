import { Component, OnInit } from '@angular/core';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { LienKet, TimKiemDanhSach } from 'src/app/models/danh-muc/lien-ket/lien-ket';
@Component({
  selector: 'app-lien-ket',
  templateUrl: './lien-ket.component.html',
  styleUrls: ['./lien-ket.component.scss']
})


export class LienKetComponent implements OnInit {

  constructor(private service: LienKetService) { }
  items: any[] = [];
  home: any;
  timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    tuNgay: new Date(),
    denNgay: new Date(),
    nam: 0
  };
  lienKets: LienKet[] = [];
  selectedState: any = null;
  loading: boolean = true;
  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  ngOnInit(): void {
    this.items = [{ label: 'Danh mục' }, { label: 'Liên kết' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loading = false;
    this.LoadListDefault(this.timKiemDanhSach);
  }
  LoadListDefault(timKiemDanhSach: TimKiemDanhSach) {
    this.service.getDanhSachDmLienKet(timKiemDanhSach).then(data => {this.lienKets = data})
  }

  editLienKet(){

  }

  deleteLienKet() {
    
  }

}
