import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriLichService } from 'src/app/demo/service/lich/quan-tri-lich.service';
import { TimKiemQuanTriLich } from 'src/app/models/thong-tin-khac/lich/quan-tri-lich';
// import { startOfWeek, endOfWeek, format } from 'date-fns';

@Component({
    selector: 'app-quan-tri-lich',
    templateUrl: './quan-tri-lich.component.html',
    styleUrls: ['./quan-tri-lich.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class QuanTriLichComponent {
    constructor(
        private messageService: MessageService,
        private service: QuanTriLichService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    currentWeek : number = 1 ;
    currentYear : number = new Date().getFullYear() ;
    startOfWeekDate : string = '';
    endOfWeekDate : string = '';
    lstTuan: SelectItem[] = [];
    lstNam: SelectItem[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiThemMoi: boolean = false;
    hienThiCapNhat: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    lstLichCaNhan: any[] = [];
    items = [{ label: 'Lịch' }, { label: 'Lịch cá nhân' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemQuanTriLich = {
        tuNgay: '1901-01-01',
        denNgay: '1901-01-01',
        donViId: Number(this.idDonViLamViec),
        userId: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadTuanNam() {
        // for (let i = 1; i <= 52; i++) {
        //     this.lstTuan.push({ label: 'Tuần ' + i, value: i });
        // }
        // let year = new Date().getFullYear() + 1;
        // for (let i = year; i >= year - 5; i--) {
        //     this.lstNam.push({ label: 'Năm ' + i, value: i });
        // }
        // const currentDate = new Date();
        // this.currentYear = currentDate.getFullYear();
        // this.currentWeek = this.getWeek(currentDate);

        // // Tính toán ngày đầu tuần và ngày cuối tuần
        // this.startOfWeekDate = startOfWeek(currentDate);
        // this.endOfWeekDate = endOfWeek(currentDate);

    }

    // getWeek(date: Date): number {
    //     // const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1));
    //     // const difference = date.getTime() - startOfYear.getTime();
    //     // const oneWeek = 7 * 24 * 60 * 60 * 1000;
    //     // return Math.ceil(difference / oneWeek);
    // }

    // Hàm format ngày theo định dạng
    // formatDate(date: Date, dateFormat: string): string {
    //     return format(date, dateFormat);
    // }

    public LoadDanhSach(): void {
        this.service
            .getDanhSachQuanTriLich(this.timKiemDanhSach)
            .then((data) => {
                this.lstLichCaNhan = data;
            });
    }

    public ThemMoi() {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string) {
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
                this.service.xoaQuanTriLich(id).subscribe(
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

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}
