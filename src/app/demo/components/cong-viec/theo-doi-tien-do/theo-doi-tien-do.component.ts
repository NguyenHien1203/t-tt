import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getISOWeek, startOfWeek, endOfWeek, format, addWeeks, subWeeks } from 'date-fns';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TheoDoiTienDoService } from 'src/app/demo/service/cong-viec/theo-doi-tien-do/theo-doi-tien-do.service';
import { TimKiemNam_Thang, TimKiemTuan } from 'src/app/models/cong-viec/theo-doi-tien-doi';

@Component({
  selector: 'app-theo-doi-tien-do',
  templateUrl: './theo-doi-tien-do.component.html',
  styleUrls: ['./theo-doi-tien-do.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TheoDoiTienDoComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;
  startOfWeekDate: Date;
  endOfWeekDate: Date;
  yearOptions: SelectItem[] = [];
  weekOptions: SelectItem[] = [];
  monthOptions: SelectItem[] = [];
  lstTienDo: any[] = [];
  currentDate = new Date();
  trangThai: SelectItem[] = [
    { label: 'Chưa xử lý', value: '1' },
    { label: 'Đang xử lý', value: '2' },
    { label: 'Xử lý xong', value: '3' },
    { label: 'Không xử lý', value: '4' },
    { label: 'Dừng xử lý', value: '7' },
  ];
  public timChinhXac: boolean = false;
  public timChinhXac_NamThang: boolean = false;

  tatCaCongViec: SelectItem[] = [
    { label: 'Chỉ đạo', value: '1' },
    { label: 'Giao việc phát sinh', value: '2' },
    { label: 'Chuyển tiếp', value: '3' },
    { label: 'Việc của VB đi', value: '4' },
    { label: 'Giải quyết thủ tục hành chính', value: '5' },
  ];

  public timKiemTuan: TimKiemTuan = {
    idUser: "",
    trangThai: "",
    tuan: null,
    nam: null,
    ngayBatDau: "",
    ngayKetThuc: "",
    tuKhoa: "",
    soKyHieu: "",
    caNhanLienQuan: "",
    tatCaCongViec: "",
    timChinhXac: 0
  }
  

  public TimKiemNam_Thang: TimKiemNam_Thang = {
    idUser: "",
    trangThai: "",
    thang: null,
    nam: new Date().getFullYear(),
    noiDung: "",
    soKyHieu: "",
    caNhanLienQuan: "",
    tatCaCongViec: "",
    timChinhXac: 0
  }


  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private auth: AuthService,
    private service: TheoDoiTienDoService

  ) { }

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Theo dõi tiến độ' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.GetDataYear();
    this.GetDataWeek();
    this.GetDataMonth();

    this.startOfWeekDate = new Date(
      this.currentDate.setDate(
        this.currentDate.getDate() - this.currentDate.getDay() + 1
      )
    ); //tính ngày bắt đầu
    this.endOfWeekDate = new Date(
      this.currentDate.setDate(
        this.currentDate.getDate() - this.currentDate.getDay() + 7
      )
    );

    this.timKiemTuan.ngayBatDau = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.timKiemTuan.ngayKetThuc = this.formatDateToDDMMYY(this.endOfWeekDate);

    this.TimKiemTuan();
  }

  public GetDataYear() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear + 1; i >= currentYear - 5; i--) {
      this.yearOptions.push({ label: i.toString(), value: i });
    }
    this.timKiemTuan.nam = this.currentDate.getFullYear();
  }

  public GetDataWeek() {
    for (let i = 1; i <= 52; i++) {
      this.weekOptions.push({ label: "Tuần " + i.toString(), value: i });
    }
    const currentWeek = getISOWeek(this.currentDate);
    this.timKiemTuan.tuan = currentWeek;
  }

  public GetDataMonth() {
    for (let i = 1; i <= 12; i++) {
      this.monthOptions.push({ label: "Tháng " + i.toString(), value: i });
    }
  }

  updateWeek(date: Date, action: 'next' | 'prev' = 'next'): void {
    // Nếu action là 'next', tăng tuần lên 1, ngược lại giảm đi 1
    const newDate =
      action === 'next' ? addWeeks(date, 1) : subWeeks(date, 1); // lấy ngày đầu từ startDay tuần trước
    this.timKiemTuan.nam = newDate.getFullYear(); // lấy năm
    this.timKiemTuan.tuan = this.getWeek(newDate); // lấy tuần từ ngày mới lấy được
    // Tính toán ngày đầu tuần và ngày cuối tuần với múi giờ địa phương

    this.startOfWeekDate = new Date(
      newDate.setDate(newDate.getDate() - newDate.getDay() + 1)
    );
    this.endOfWeekDate = new Date(
      newDate.setDate(newDate.getDate() - newDate.getDay() + 7)
    );


    this.timKiemTuan.ngayBatDau = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.timKiemTuan.ngayKetThuc = this.formatDateToDDMMYY(this.endOfWeekDate);
    this.TimKiemTuan();
  }

  public ChangeLich() {
    const firstDayOfThisWeek = this.getFirstDayOfWeek(
      this.timKiemTuan.nam,
      this.timKiemTuan.tuan
    ); //lấy ngày đầu tiên của tuần hiện tại, dưới làm tương tự
    this.startOfWeekDate = new Date(
      firstDayOfThisWeek.setDate(
        firstDayOfThisWeek.getDate() - firstDayOfThisWeek.getDay() + 1
      )
    );
    this.endOfWeekDate = new Date(
      firstDayOfThisWeek.setDate(
        firstDayOfThisWeek.getDate() - this.currentDate.getDay() + 6 //chủ nhật
      )
    );
    this.timKiemTuan.ngayBatDau = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.timKiemTuan.ngayKetThuc = this.formatDateToDDMMYY(this.endOfWeekDate);
    this.TimKiemTuan();
  }

  getFirstDayOfWeek(year: number, week: number): Date {
    // Tính toán ngày đầu tuần của tuần và năm cụ thể
    const firstDayOfYear = new Date(year, 0, 1); //lấy ngày đầu tuần của năm

    //js quy ước từ 1 đến 53 tuần nhưng chỉ có 52 tuần nên phải -1;
    return addWeeks(firstDayOfYear, week - 1); // + số tuần đã chọn sẽ ra ngày đầu của tuần
  }

  public TimKiemTuan() {
    this.timKiemTuan.timChinhXac = this.timChinhXac ? 1 : 0;
    this.timKiemTuan.idUser = this.auth.GetmUserInfo().userId.toString();
    this.timKiemTuan.idNhomQuyen = this.auth.GetmUserInfo().nhomQuyenId.toString();
    this.service.GetDanhSachTienDoTuan(this.timKiemTuan).subscribe(data => {
      if (data.isError) {

      } else {
        this.lstTienDo = data.objData;
      }
    })
  }

  public TimKiemThang() {
    this.TimKiemNam_Thang.timChinhXac = this.timChinhXac_NamThang ? 1 : 0;
    this.TimKiemNam_Thang.idUser = this.auth.GetmUserInfo().userId.toString();
    this.TimKiemNam_Thang.idNhomQuyen = this.auth.GetmUserInfo().nhomQuyenId.toString();
    this.service.GetDanhSachTienDoNamThang(this.TimKiemNam_Thang).subscribe(data => {
      if (data.isError) {

      } else {
        this.lstTienDo = data.objData;
        console.log(data.objData)
      }
    })
  }

  public CheckedHt(): void {
    this.timChinhXac = !this.timChinhXac;
  }

  public CheckedHt_NamThang(): void {
    this.timChinhXac_NamThang = !this.timChinhXac_NamThang;
  }

  formatDateToDDMMYY(date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();
    return day + '/' + month + '/' + year;
  }

  getWeek(date: Date): number {
    const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1)); //ngày đầu tiên của năm hiện tại
    const difference = date.getTime() - startOfYear.getTime(); //lấy ra milliseconds giây(js) từ đầu năm đến hiện tại
    const oneWeek = 7 * 24 * 60 * 60 * 1000; //1 tuần có bao nhiêu milis
    return Math.ceil(difference / oneWeek); //chia ra thì ra tương đối số tuần

  }


}
