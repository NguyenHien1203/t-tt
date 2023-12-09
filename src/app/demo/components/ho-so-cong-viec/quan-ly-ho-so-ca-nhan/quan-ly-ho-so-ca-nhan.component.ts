import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { merge } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-ca-nhan.service';
import { TimKiemQuanLyHoSoCaNhan } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-ca-nhan';

@Component({
    selector: 'app-quan-ly-ho-so-ca-nhan',
    templateUrl: './quan-ly-ho-so-ca-nhan.component.html',
    styleUrls: ['./quan-ly-ho-so-ca-nhan.component.scss'],
    providers : [ConfirmationService, MessageService]
})
export class QuanLyHoSoCaNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: QuanLyHoSoCaNhanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    lstNam: SelectItem[] = [];
    lstThang: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    loading: boolean = false;
    lstTrangThai: any = [];
    lstLoaiHoSo: any = [];
    lstHoSoCaNhan: any[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Quản lý hồ sơ công việc cá nhân' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemQuanLyHoSoCaNhan = {
        keyWord: '',
        userId: Number(this.idUser),
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhMuc() {
        this.service
            .getDanhSachLoaiHoSo(this.idDonViLamViec)
            .then((data) => (this.lstLoaiHoSo = data));

        const currentYear = new Date().getFullYear() + 1;
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.lstNam.push({ label: 'Năm' + i, value: i });
        }

        for (let i = 1; i <= 12; i--) {
            this.lstThang.push({ label: 'Tháng ' + i, value: i });
        }
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachHoSoCaNhan(this.timKiemDanhSach)
            .then((data) => {
                this.lstHoSoCaNhan = data;
            });
    }

    public ThemMoi() {
        this.router.navigate([
            './ho-so-cong-viec/quan-ly-ho-so-ca-nhan/them-moi',
        ]);
    }

    public CapNhat(id: string) {
        this.router.navigate(
            ['./ho-so-cong-viec/quan-ly-ho-so-ca-nhan/cap-nhat'],
            { queryParamsHandling: 'merge', queryParams: { id: id } }
        );
    }

    public Thoat(itemHt: any, loai: string): void {
        this.LoadDanhSach();
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa hồ sơ?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaHoSoCaNhan(id).subscribe(
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
