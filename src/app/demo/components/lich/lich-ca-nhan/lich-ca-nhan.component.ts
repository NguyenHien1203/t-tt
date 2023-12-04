import { ChangeDetectorRef, Component } from '@angular/core';
import { LichCaNhanService } from 'src/app/demo/service/lich/lich-ca-nhan.service';
import { AuthService } from 'src/app/common/auth.services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TimKiemLichCaNhan } from 'src/app/models/thong-tin-khac/lich/lich-ca-nhan';
@Component({
    selector: 'app-lich-ca-nhan',
    templateUrl: './lich-ca-nhan.component.html',
    styleUrls: ['./lich-ca-nhan.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class LichCaNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: LichCaNhanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

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
    timKiemDanhSach: TimKiemLichCaNhan = {
        keyWord: '',
        tuNgay: '1901-01-01',
        denNgay: '1901-01-01',
        userId: Number(this.idUser),
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.service
            .getDanhSachLichCaNhan(this.timKiemDanhSach)
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
            message: 'Bạn có chắc chắn xác nhận xóa lịch cá nhân?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaLichCaNhan(id).subscribe(
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
