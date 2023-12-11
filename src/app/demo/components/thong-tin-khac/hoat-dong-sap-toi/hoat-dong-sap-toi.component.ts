import { HoatDongSapToi } from './../../../../models/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi';
import { Component, OnInit } from '@angular/core';
import { addWeeks, startOfWeek, subWeeks, endOfWeek } from 'date-fns';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DatePipe } from '@angular/common';
import { HoatDongSapToiService } from 'src/app/demo/service/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi.service';
import { TimKiemHoatDong } from 'src/app/models/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi';

@Component({
  selector: 'app-hoat-dong-sap-toi',
  templateUrl: './hoat-dong-sap-toi.component.html',
  styleUrls: ['./hoat-dong-sap-toi.component.scss'],
  providers: [MessageService, DatePipe]
})
export class HoatDongSapToiComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  deleteProductDialog: boolean = false;
  msgs: Message[] = [];
  idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
  lstHoatDong: HoatDongSapToi[] = [];
  hoatDong: HoatDongSapToi = {};

  timKiem: TimKiemHoatDong = {
    keyWord: "",
    tuNgay: "",
    denNgay: "",
    donViId: Number(this.idDonViLamViec),
  }

  currentDate: Date;
  currentWeek: number = 1;
  currentYear: number = new Date().getFullYear();

  lstWeeks: SelectItem[] = [];
  lstYears: SelectItem[] = [];
  
  startOfWeek: Date;
  endOfWeek: Date;
  showFirstOfWeek: string;
  showEndOfWeek: string;

  hienThiThemMoi: boolean = false;
  hienThiCapNhat: boolean = false;
  hienThiGui: boolean = false;

  idXoa: any;
  idCapNhat: any;
  idGui: any;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private hoatDongSapToiService: HoatDongSapToiService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Thông tin khác' });
    this.breadcrumbItems.push({ label: 'Hoạt động sắp tới' });

    this.currentDate = new Date();
    this.LoadTuanNam();
    this.GetDanhSach();
  }

  LoadTuanNam() {
    for (let i = 1; i <= 52; i++) {
      this.lstWeeks.push({ label: 'Tuần ' + i, value: i });
    }

    let year = new Date().getFullYear() + 1;
    for (let i = year; i >= year - 5; i--) {
      this.lstYears.push({ label: 'Năm ' + i, value: i });
    }

    this.currentWeek = this.getWeek(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();

    this.startOfWeek = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + 1));
    this.endOfWeek = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + 7));

    this.showFirstOfWeek = this.formatDateToDDMMYY(this.startOfWeek);
    this.showEndOfWeek = this.formatDateToDDMMYY(this.endOfWeek);
  }

  ChangeLich() {
    const firstDayOfWeek = this.getFirstDayOfWeek(this.currentYear, this.currentWeek);
    this.startOfWeek = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + 1));
    this.endOfWeek = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() - this.currentDate.getDay() + 6));
    this.showFirstOfWeek = this.formatDateToDDMMYY(this.endOfWeek);
  }

  UpdateWeek(date: Date, action: 'next' | 'prev' = 'next') {
    const newDate = action === 'next' ? addWeeks(date, 1) : subWeeks(date, 1);
    this.currentYear = newDate.getFullYear();
    this.currentWeek = this.getWeek(newDate);

    this.startOfWeek = new Date(newDate.setDate(newDate.getDate() - newDate.getDay() + 1));
    this.endOfWeek = new Date(newDate.setDate(newDate.getDate() - newDate.getDay() + 7));

    this.showFirstOfWeek = this.formatDateToDDMMYY(this.startOfWeek);
    this.showEndOfWeek = this.formatDateToDDMMYY(this.endOfWeek);
    this.GetDanhSach();
  }

  getWeek(date: Date): number {
    const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1));
    const difference = date.getTime() - startOfYear.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.ceil(difference / oneWeek);
  }

  getFirstDayOfWeek(year: number, week: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);
    return addWeeks(firstDayOfYear, week - 1);
  }

  formatDateToDDMMYY(date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();
    return day + '/' + month + '/' + year;
  }

  GetDanhSach() {
    this.timKiem.tuNgay = this.startOfWeek.toLocaleDateString();
    this.timKiem.denNgay = this.endOfWeek.toLocaleDateString();
    console.log(this.timKiem);
    
    this.hoatDongSapToiService.getDanhSach(this.timKiem).subscribe(data => {
      if (data.isError) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: "Dữ liệu không hợp lệ" });
      } else {
        console.log(data);
        this.lstHoatDong = data;
      };
    }, (error) => {
      console.log('Error', error);
    })
  }                                                                                                                                                                                                                 

  ThemMoi() {
    this.hienThiThemMoi = true;
  }

  CapNhat(id: any) {
    this.hienThiCapNhat = true;
    this.idCapNhat = id;
  }

  Gui(id: any) {
    this.hienThiGui = true;
    this.idGui = id;
  }

  TatPopup(item: any, type: string) {
    if (type === 'C') {
      this.hienThiThemMoi = false;
    } 
    else if (type === 'U') {
      this.hienThiCapNhat = false;
    } else if (type === 'S') {
      this.hienThiGui = false;
    }
  }

  Xoa(id: any) {
    this.deleteProductDialog = true;
    this.idXoa = id;
  }

  TamDungXoa() {
    this.deleteProductDialog = false;
    this.idXoa = null;
  }

  XacNhanXoa() {
    this.deleteProductDialog = false;
    this.hoatDongSapToiService.xoa(this.idXoa).subscribe(
      data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: data.title, life: 3000 });
        } else {
          this.GetDanhSach();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: data.title, life: 3000 });
        }
      }
    )
  }
}
