import { addWeeks, format, startOfWeek } from 'date-fns';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from '../../service/dashboard.service';
import {
    TimKiemCongViecDashBoard,
    TimKiemLichCoQuanDashBoard,
    TimKiemThongKeThongTin,
} from 'src/app/models/dash-board';
import { AuthService } from 'src/app/common/auth.services';
import 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import {
    CalendarOptions,
    DateSelectArg,
    EventApi,
    EventClickArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import viLocale from '@fullcalendar/core/locales/vi';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;
    constructor(
        public layoutService: LayoutService,
        private service: DashboardService,
        private authService: AuthService,
        private router: Router
    ) {
        if (!this.authService.CheckLogin()) this.router.navigate(['/login']);
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    loading: boolean = false;
    headerCalendar =
        'tháng ' +
        (new Date().getMonth() + 1) +
        ' ( năm ' +
        new Date().getFullYear() +
        ')';

    trHTML = '</tr>';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idDonVi: string = this.authService.GetmUserInfo()?.donViId ?? '0';
    idDonVilamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    items!: MenuItem[];
    currentDate: string = '';
    currentDay: string = '';
    startOfWeek: string = '';
    endOfWeek: string = '';
    currentWeek: number = 1;
    lstCongViec: any[] = [];
    lstTienDo: any[] = [];
    lstLichCoQuanSang: any[] = [];
    lstLichCoQuanChieu: any[] = [];
    lstLichCoQuanSangChieu: any[] = [];
    lstLichCoQuanTuanChieu: any[] = [];
    lstLichCoQuanTuan: any[] = [];
    chartData: any;
    chartOptions: any;
    dataFullCalendar: any = null;
    thongTinThongKe: any;
    routerLinkCongViec: string = '';
    subscription!: Subscription;
    currentEvents: EventApi[] = [];
    displayDialog: boolean = false;
    eventDetails: any;
    timKiemCongViecDashBoard: TimKiemCongViecDashBoard = {
        idNhomQuyen: Number(this.idNhomQuyen),
        idUser: Number(this.idUser),
        idPhongBan: Number(this.idPhongBan),
        tuNgay: '',
        denNgay: '',
    };
    timKiemLichCoQuanDashBoard: TimKiemLichCoQuanDashBoard = {
        idDonVi: this.idDonVi?.toString(),
        firstDayOfWeek: '',
    };
    timKiemThongTinThongKeDashBoard: TimKiemThongKeThongTin = {
        idUser: this.idUser,
        idPhongBan: this.idPhongBan,
        idNhomQuyen: this.idNhomQuyen,
        idDonViLamViec: this.idDonVilamViec,
    };

    async ngOnInit() {
        let status = await this.authService.CheckLogin();
        if (!status) {
            this.router.navigate(['/login']);
        }
        this.currentDate = this.formatDateToDDMMYY(new Date());

        var days = [
            'Chủ nhật',
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ 6',
            'Thứ 7',
        ];
        this.currentDay = days[new Date().getDay()];
        this.initChart();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
        this.LoadDanhSachLichCoQuan();
        this.LoadThongTinThongKe();
    }

    formatDateToDDMMYY(date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();
        return day + '/' + month + '/' + year;
    }

    async LoadThongTinThongKe() {
        this.thongTinThongKe = await this.service.getThongTinThongKeDashBoard(
            this.timKiemThongTinThongKeDashBoard
        );
    }

    async LoadDanhSachLichCoQuan() {
        try {
            this.currentWeek = this.getWeek(new Date());
            const firstDayOfThisWeek = this.getFirstDayOfWeek(
                new Date().getFullYear(),
                this.currentWeek
            );
            this.timKiemLichCoQuanDashBoard.firstDayOfWeek = format(
                firstDayOfThisWeek,
                'dd/MM/yyyy'
            );

            const data = await this.service.getDanhSachLichCoQuan(
                this.timKiemLichCoQuanDashBoard
            );

            const dataFullCalendar =
                await this.service.getDanhSachLichCoQuanFullCalendar(
                    this.timKiemLichCoQuanDashBoard
                );

            this.calendarOptions.events = dataFullCalendar;
            this.lstLichCoQuanSang = data?.lstLichCoQuanSang;
            this.lstLichCoQuanChieu = data?.lstLichCoQuanChieu;
            this.lstLichCoQuanTuan = data?.lstLichCoQuanTuan;
        } catch (error) {
            console.log(error);
        }
    }

    getSoLichCongTac(a: number, b: number): number {
        let soLich = 0;
        soLich = a + b;
        if (a == 0) soLich += 1;
        if (b == 0) soLich += 1;
        return soLich;
    }

    async initChart() {
        try {
            this.loading = true;
            let currentDate = new Date();
            const startOfWeekDate = new Date(
                currentDate.setDate(
                    currentDate.getDate() - currentDate.getDay() + 1
                )
            ); //tính ngày bắt đầu
            const endOfWeekDate = new Date(
                currentDate.setDate(
                    currentDate.getDate() - currentDate.getDay() + 7
                )
            ); //tính ngày kết thúc

            if (this.timKiemCongViecDashBoard.tuNgay === '') {
                this.timKiemCongViecDashBoard.tuNgay = format(
                    startOfWeekDate,
                    'dd/MM/yyyy'
                ); //Chuyển dạng dd/MM/yyyy ra UI
            }

            if (this.timKiemCongViecDashBoard.denNgay === '') {
                this.timKiemCongViecDashBoard.denNgay = format(
                    endOfWeekDate,
                    'dd/MM/yyyy'
                );
            }
            this.startOfWeek = format(startOfWeekDate, 'dd/MM/yyyy');
            this.endOfWeek = format(endOfWeekDate, 'dd/MM/yyyy');
            const data = await this.service.getDataCongViec(
                this.timKiemCongViecDashBoard
            );

            this.lstCongViec = data?.lstTheoDoiTienDo || [];
            this.lstTienDo = data?.lstTienDoXuLy || [];
            this.routerLinkCongViec =
                this.idNhomQuyen == '3'
                    ? '/cong-viec/theo-doi-tien-do'
                    : 'cong-viec/xu-ly-cong-viec';

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const surfaceBorder =
                documentStyle.getPropertyValue('--surface-border');

            this.chartData = {
                datasets: [
                    {
                        data: data?.dataBieuDo,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--bluegray-500'),
                            documentStyle.getPropertyValue('--blue-500'),
                        ],
                        label: 'My dataset',
                    },
                ],
                labels: [
                    'Chưa xử lý',
                    'Đang xử lý',
                    'Đến hạn',
                    'Quá hạn',
                    'Xử lý xong',
                ],
            };

            this.chartOptions = {
                plugins: {
                    datalabels: {
                        color: textColor,
                        display: true,
                    },
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    r: {
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                },
            };
            clearTimeout(1000);
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        events: [],
        customButtons: {
            addEvents: {
                text: 'Thêm sự kiện',
                click: () => {
                    // Navigate to the desired route
                    this.router.navigate(['/lich/lich-co-quan']);
                },
            },
        },
        headerToolbar: {
            start: 'prev,next today addEvents',
            center: 'title',
            end: 'dayGridMonth dayGridWeek dayGridDay',
        },

        eventColor: '#378006',
        locale: viLocale,
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEvents.bind(this),
    };

    navigateAddEvent() {
        this.router.navigate(['/lich/lich-co-quan']);
    }

    clickCalendar(tabNumber: any): void {
        if (tabNumber.index === 2) {
            this.calendarComponent.getApi().render();
            setTimeout(() => {
                this.calendarComponent.getApi().updateSize();
            }, 100); // Sử dụng setTimeout để đảm bảo rằng updateSize được gọi sau khi render hoàn tất
        }
    }

    getWeek(date: Date): number {
        const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1)); //ngày đầu tiên của năm hiện tại
        const difference = date.getTime() - startOfYear.getTime(); //lấy ra milliseconds giây(js) từ đầu năm đến hiện tại
        const oneWeek = 7 * 24 * 60 * 60 * 1000; //1 tuần có bao nhiêu milis
        return Math.ceil(difference / oneWeek); //chia ra thì ra tương đối số tuần
    }

    getFirstDayOfWeek(year: number, week: number): Date {
        // Tính toán ngày đầu tuần của tuần và năm cụ thể
        const firstDayOfYear = new Date(year, 0, 1); //lấy ngày đầu tuần của năm

        //js quy ước từ 1 đến 53 tuần nhưng chỉ có 52 tuần nên phải -1;
        return addWeeks(firstDayOfYear, week - 1); // + số tuần đã chọn sẽ ra ngày đầu của tuần
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getColor(code: string, cl: string): string {
        if (code === 'CXL') return cl + '-red-500';
        if (code === 'XLX') return cl + '-blue-500';
        if (code === 'DXL') return cl + '-green-500';
        if (code === 'QH') return cl + '-bluegray-500';
        if (code === 'DH') return cl + '-yellow-500';
        return '';
    }

    handleEvents(events: EventApi[]) {
        this.currentEvents = events;
    }

    handleEventClick(clickInfo: EventClickArg) {
        this.eventDetails = clickInfo.event; // Lưu trữ thông tin sự kiện
        this.displayDialog = true; // Hiển thị dialog
    }

    navigateToCongViec(vaiTro: number): void {
        this.router.navigate(['/cong-viec/xu-ly-cong-viec', { type: vaiTro }]);
    }
}
