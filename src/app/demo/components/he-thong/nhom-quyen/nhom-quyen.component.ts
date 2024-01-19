import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhomQuyenService } from 'src/app/demo/service/he-thong/nhom-quyen.service';
import { TimKiemNhomQuyen } from 'src/app/models/he-thong/nhom-quyen';

@Component({
    selector: 'app-nhom-quyen',
    templateUrl: './nhom-quyen.component.html',
    styleUrls: ['./nhom-quyen.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class NhomQuyenComponent {
    constructor(
        private messageService: MessageService,
        private service: NhomQuyenService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef,
        private router: Router
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    public id: string = '1';
    hienThiCapNhat: boolean = false;
    hienThiThemMoi: boolean = false;
    loading: boolean = false;
    lstNhomQuyen: any[] = [];
    items = [{ label: 'Hệ thống' }, { label: 'Nhóm quyền' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemNhomQuyen = {
        keyWord: '',
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
    }

    public async LoadDanhSach() {
        try {
            this.lstNhomQuyen = await this.service.getDanhSachNhomQuyen(
                this.timKiemDanhSach
            );
        } catch (error) {
            console.log(error);
        }
    }

    public GanQuyen(id: string, tenQuyen: string) {
        this.router.navigate(['/he-thong/nhom-quyen/gan-quyen'], {
            queryParams: { id: id, tenQuyen: tenQuyen },
            queryParamsHandling: 'merge',
        });
    }

    public ThemMoi() {
        this.hienThiThemMoi = true;
    }

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'T') this.hienThiThemMoi = false;
        this.LoadDanhSach();
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa nhóm quyền?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaNhomQuyen(id).subscribe(
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
