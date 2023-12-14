import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/duyet-phieu-trinh.service';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';

@Component({
    selector: 'app-duyet-phieu-trinh',
    templateUrl: './duyet-phieu-trinh.component.html',
    styleUrls: ['./duyet-phieu-trinh.component.scss'],
})
export class DuyetPhieuTrinhComponent {
    constructor(
        private messageService: MessageService,
        private service: DuyetPhieuTrinhService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    timChinhXac: boolean = false;
    public id: string = '1';
    loading: boolean = false;
    hienThiThemMoi: boolean = false;
    hienThiCapNhat: boolean = false;
    lstTrangThai: any = [];
    lstLanhDaoKy: any = [];
    lstLanhDaoDuyet: any = [];
    lstPhieuTrinh: any[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Phiếu trình' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemPhieuTrinh = {
        keyWord: '',
        ngayTrinh: '1901-01-01',
        lanhDaoDuyet: 0,
        lanhDaoKy: 0,
        trangThai: 0,
        donViId: Number(this.idDonViLamViec),
        phongBanId: Number(this.idPhongBan),
        nguoiTao: Number(this.idUser),
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachPhieuTrinhChoXuLy(this.timKiemDanhSach)
            .then((data) => {
                this.lstPhieuTrinh = data;
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
        if (loai == 'T') this.hienThiThemMoi = false;
        if (loai == 'C') this.hienThiCapNhat = false;
        this.LoadDanhSach();
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}
