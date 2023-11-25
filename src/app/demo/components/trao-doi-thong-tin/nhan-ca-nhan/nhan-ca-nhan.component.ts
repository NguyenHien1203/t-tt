import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhanCaNhanService } from 'src/app/demo/service/trao-doi-thong-tin/nhan-ca-nhan.service';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/nhan-ca-nhan';

@Component({
    selector: 'app-nhan-ca-nhan',
    templateUrl: './nhan-ca-nhan.component.html',
    styleUrls: ['./nhan-ca-nhan.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class NhanCaNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: NhanCaNhanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private confirmationService: ConfirmationService
    ) {}

    items = [{ label: 'Trao đổi thông tin' }, { label: 'Nhãn cá nhân' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    timChinhXac: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = true;
    public id: string = '1';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    timKiemDanhSach: TimKiemDanhSach = {
        tenNhan: '',
        ghiChu: '',
        timChinhXac: 0,
        nguoiTao: Number(this.idUser),
    };

    ngOnInit() {
        this.loading = false;
        this.LoadDanhSach();
    }

    public LoadDanhSach() {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachNhanCaNhan(this.timKiemDanhSach)
            .then((data) => {
                this.lstNhanCaNhan = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'T') this.hienThiThemMoi = false;
        this.LoadDanhSach();
    }

    public ThemMoi(): void {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string): void {
        this.id = id;
        this.hienThiCapNhat = true;
    }

    public Xoa(id: string) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa nhãn cá nhân?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaNhanCaNhan(id).subscribe(
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

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }
}
