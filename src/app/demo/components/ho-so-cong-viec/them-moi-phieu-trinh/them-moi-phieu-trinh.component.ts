import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ThemMoiPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/them-moi-phieu-trinh.service';
import { TimKiemPhieuTrinh } from 'src/app/models/ho-so-cong-viec/them-moi-phieu-trinh';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-them-moi-phieu-trinh',
    templateUrl: './them-moi-phieu-trinh.component.html',
    styleUrls: ['./them-moi-phieu-trinh.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ThemMoiPhieuTrinhComponent {
    constructor(
        private messageService: MessageService,
        private service: ThemMoiPhieuTrinhService,
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
    hienThiChiTiet: boolean = false;
    lstTrangThai: modelOptions[] = [
        { text: 'Chọn trạng thái', value: 4 },
        { text: 'Chờ duyệt', value: 0 },
        { text: 'Đã duyệt', value: 1 },
        { text: 'Đã ký', value: 2 },
        { text: 'Đã ký', value: 2 },
        { text: 'Trả lại', value: 3 },
    ];
    lstLanhDaoKy: modelOptions[] = [];
    lstLanhDaoDuyet: modelOptions[] = [];
    lstPhieuTrinh: modelOptions[] = [];
    items = [{ label: 'Hồ sơ công việc' }, { label: 'Phiếu trình' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemPhieuTrinh = {
        keyWord: '',
        ngayTrinh: '1901-01-01',
        lanhDaoDuyet: 0,
        lanhDaoKy: 0,
        trangThai: 4,
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
        this.service
            .getDanhSachLanhDaoDuyet(this.idDonViLamViec)
            .then((data) => {
                this.lstLanhDaoDuyet = data;
            });

        this.service.getDanhSachLanhDaoKy(this.idDonViLamViec).then((data) => {
            this.lstLanhDaoKy = data;
        });
        this.LoadDanhSach();
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachPhieuTrinh(this.timKiemDanhSach)
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

    public ChiTiet(id: string) {
        this.id = id;
        this.hienThiChiTiet = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai == 'T') this.hienThiThemMoi = false;
        if (loai == 'C') this.hienThiCapNhat = false;
        if (loai == 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa phiếu trình?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaPhieuTrinh(id).subscribe(
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
