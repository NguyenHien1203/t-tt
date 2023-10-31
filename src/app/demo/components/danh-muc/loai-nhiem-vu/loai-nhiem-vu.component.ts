import { Component, OnInit } from '@angular/core';
import { LoaiNhiemVuService } from 'src/app/demo/service/danh-muc/loai-nhiem-vu/loai-nhiem-vu.service';
import { TimKiemDanhSach } from 'src/app/models/danh-muc/loai-nhiem-vu/loai-nhiem-vu';

@Component({
  selector: 'app-loai-nhiem-vu',
  templateUrl: './loai-nhiem-vu.component.html',
  styleUrls: ['./loai-nhiem-vu.component.scss']
})
export class LoaiNhiemVuComponent implements OnInit {
  first: number = 1;
  rows: number = 10;
  totalRecords: number = 0;
  constructor(private service: LoaiNhiemVuService) { }
  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.items = [{ label: 'Danh mục' }, { label: 'Loại nhiệm vụ' }];
    this.loading = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }
  timChinhXac: boolean = false;
  timKiemDanhSach: TimKiemDanhSach = {
    keyWord: "",
    moTa: "",
    timChinhXac: 0,
    pageSize: 15,
    pageNumber: 1,
    donViId: 0
  };
  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  loading: boolean = true;
  loaiNhiemVus: any[] = [];
  home: any;
  items: any[] = [];
  id: string = "";

  LoadDanhSach(timKiemDanhSach: TimKiemDanhSach) {
    this.timKiemDanhSach.pageNumber = Math.floor(this.first/this.rows) + 1;
    this.timKiemDanhSach.pageSize = this.rows;
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    console.log(this.timKiemDanhSach)
    this.service.getDanhSachLoaiNhiemVu(timKiemDanhSach).then(data => { this.loaiNhiemVus = data; this.totalRecords = Object.keys(data).length })
  }

  public Thoat(itemHt: any, loai: string): void {
    if (loai === 'T')
      this.hienThiThemMoi = false;
    else
      this.hienThiCapNhat = false;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

  public onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.LoadDanhSach(this.timKiemDanhSach);
  }

  public ThemMoi(): void {
    this.hienThiThemMoi = true;
  }

  public CapNhat(id : string): void {
    this.hienThiCapNhat = true;
    this.id = id;
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }
}
