import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { addWeeks, startOfWeek, subWeeks } from 'date-fns';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LichUbndTinhService } from 'src/app/demo/service/lich/lich-ubnd-tinh.service';
import { QuanTriLichService } from 'src/app/demo/service/lich/quan-tri-lich.service';
import { TimKiemLichUBNDTinh } from 'src/app/models/thong-tin-khac/lich/lich-ubnd-tinh';

@Component({
  selector: 'app-lich-ubnd-tinh',
  templateUrl: './lich-ubnd-tinh.component.html',
  styleUrls: ['./lich-ubnd-tinh.component.scss'],
  providers : [MessageService, ConfirmationService, DatePipe]
})
export class LichUbndTinhComponent {
  constructor(
    private messageService: MessageService,
    private service: LichUbndTinhService,
    private authService: AuthService,
    private confirmService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
) {}

currentDate: Date;
currentWeek: number = 1;
currentYear: number = new Date().getFullYear();
startOfWeekDate: Date;
firstOfWeek_show: string;
endOfWeek_show: string;
endOfWeekDate: Date;
lstTuan: SelectItem[] = [];
lstNam: SelectItem[] = [];
idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
public id: string = '1';
hienThiThemMoi: boolean = false;
hienThiCapNhat: boolean = false;
loading: boolean = false;
lstLichCaNhan: any[] = [];
items = [{ label: 'Lịch' }, { label: 'Quản trị lịch' }];
home = { icon: 'pi pi-home', routerLink: '/' };
timKiemDanhSach: TimKiemLichUBNDTinh = {
    tuNgay: '1901-01-01',
    denNgay: '1901-01-01',
    donViId: Number(this.idDonViLamViec),
};

ngAfterContentChecked(): void {
    this.cd.detectChanges();
}

ngOnInit(): void {
    this.currentDate = new Date();
    this.loading = false;
    this.LoadTuanNam();
    this.LoadDanhSach();
}

public LoadTuanNam() {
    for (let i = 1; i <= 52; i++) {
        this.lstTuan.push({ label: 'Tuần ' + i, value: i });
    }
    let year = new Date().getFullYear() + 1;
    for (let i = year; i >= year - 5; i--) {
        this.lstNam.push({ label: 'Năm ' + i, value: i });
    }

    this.currentWeek = this.getWeek(this.currentDate);
    this.currentYear = this.currentDate.getFullYear();

    this.startOfWeekDate = new Date(
        this.currentDate.setDate(
            this.currentDate.getDate() - this.currentDate.getDay() + 1
        )
    ); //tính ngày bắt đầu
    this.endOfWeekDate = new Date(
        this.currentDate.setDate(
            this.currentDate.getDate() - this.currentDate.getDay() + 7
        )
    ); //tính ngày kết thúc
    this.firstOfWeek_show = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.endOfWeek_show = this.formatDateToDDMMYY(this.endOfWeekDate);
}

public ChangeLich() {
    const firstDayOfThisWeek = this.getFirstDayOfWeek(
        this.currentYear,
        this.currentWeek
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
    this.firstOfWeek_show = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.endOfWeek_show = this.formatDateToDDMMYY(this.endOfWeekDate);
    this.LoadDanhSach();
}

getWeek(date: Date): number {
    const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1)); //ngày đầu tiên của năm hiện tại
    const difference = date.getTime() - startOfYear.getTime(); //lấy ra milliseconds giây(js) từ đầu năm đến hiện tại
    const oneWeek = 7 * 24 * 60 * 60 * 1000; //1 tuần có bao nhiêu milis
    return Math.ceil(difference / oneWeek); //chia ra thì ra tương đối số tuần

    // const firstDayOfYear = new Date(this.currentDate.getFullYear(), 0, 1);
    //     const daysSinceFirstDay = Math.floor(
    //         (this.currentDate.getTime() - firstDayOfYear.getTime()) /
    //             (60 * 60 * 24 * 1000)
    //     );
    //     return Math.ceil(
    //         (daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7
    //     );
}

getFirstDayOfWeek(year: number, week: number): Date {
    // Tính toán ngày đầu tuần của tuần và năm cụ thể
    const firstDayOfYear = new Date(year, 0, 1); //lấy ngày đầu tuần của năm

    //js quy ước từ 1 đến 53 tuần nhưng chỉ có 52 tuần nên phải -1;
    return addWeeks(firstDayOfYear, week - 1); // + số tuần đã chọn sẽ ra ngày đầu của tuần
}

formatDateToDDMMYY(date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString();
    return day + '/' + month + '/' + year;
}

updateWeek(date: Date, action: 'next' | 'prev' = 'next'): void {
    // Nếu action là 'next', tăng tuần lên 1, ngược lại giảm đi 1
    const newDate =
        action === 'next' ? addWeeks(date, 1) : subWeeks(date, 1); // lấy ngày đầu từ startDay tuần trước
    this.currentYear = newDate.getFullYear(); // lấy năm
    this.currentWeek = this.getWeek(newDate); // lấy tuần từ ngày mới lấy được
    // Tính toán ngày đầu tuần và ngày cuối tuần với múi giờ địa phương

    this.startOfWeekDate = new Date(
        newDate.setDate(newDate.getDate() - newDate.getDay() + 1)
    );
    this.endOfWeekDate = new Date(
        newDate.setDate(
            newDate.getDate() - newDate.getDay() + 7
        )
    );
    console.log(this.endOfWeekDate)

    this.firstOfWeek_show = this.formatDateToDDMMYY(this.startOfWeekDate); //Chuyển dạng dd/MM/yyyy ra UI
    this.endOfWeek_show = this.formatDateToDDMMYY(this.endOfWeekDate);
    this.LoadDanhSach();
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.tuNgay = this.startOfWeekDate.toLocaleDateString();
    this.timKiemDanhSach.denNgay = this.endOfWeekDate.toLocaleDateString();
    this.service
        .getDanhSachLichUBNDTinh(this.timKiemDanhSach)
        .then((data) => {
            this.lstLichCaNhan = data;
        });
}

public ThemMoi() : void {
    this.hienThiThemMoi = true;
}

public CapNhat(id: string) : void {
    this.id = id;
    this.hienThiCapNhat = true;
}

public Thoat(itemHt: any, loai: string): void {
    if (loai === 'C') this.hienThiCapNhat = false;
    if (loai === 'T') this.hienThiThemMoi = false;
    this.LoadDanhSach();
}

public Xoa(id: string) {
    this.confirmService.confirm({
        message: 'Bạn có chắc chắn xác nhận xóa quản trị lịch?',
        header: 'Xác nhận',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.service.xoaLichUBNDTinh(id).subscribe(
                (data) => {
                    if (data.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    } else {
                        this.LoadDanhSach();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: data.title,
                        });
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        },
        reject: () => {},
    });
}
}
