import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/cap-nhat-moi';

@Component({
    selector: 'app-cap-nhat-moi',
    templateUrl: './cap-nhat-moi.component.html',
    styleUrls: ['./cap-nhat-moi.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class CapNhatMoiComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private service: CapNhatMoiService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiPhanPhoi: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiGuiVanBan: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    capNhatMois: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Cập nhật mới' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        soVanBanId: 0,
        vanBanId: 0,
        donViId: Number(this.idDonViLamViec),
        mucDo: 0,
        loaiVanBanId: 0,
        lanhDaoKy: '',
        ngayGuiVanBan: '1901-01-01',
        ngayBanHanhVanBan: '1901-01-01',
        nam: new Date().getFullYear(),
        thang: 0,
        trangThai: 0,
        soKyHieu: '',
        lanhDaoKyId: 0,
        soDi: null,
        pageIndex: 0,
        pageSize: 0,
        trichYeu: '',
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataYear();
        this.loading = false;
        this.LoadDanhSach();
        this.LoadSoVanBan();
    }
    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public changeSoVanBan(event) {
        this.lstLoaiVanBan  = [];
        if (event != null) {
            this.service
                .changeSoVanBan(event, this.idDonViLamViec)
                .then((data) => {
                    this.lstLoaiVanBan = data;
                });
        }
    }

    public GetDataYear() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: i.toString(), value: i });
        }
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachVanBanDi(this.timKiemDanhSach).then((data) => {
            this.capNhatMois = data;
        });
    }

    public ThemMoi() {
        this.router.navigate(['./van-ban-di/cap-nhat-moi/them-moi']);
    }

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'G') this.hienThiGuiVanBan = false;
        if (loai === 'P') this.hienThiPhanPhoi = false;
        this.LoadDanhSach();
    }

    public PhanPhoi(id: string) {
        this.hienThiPhanPhoi = true;
        this.id = id;
    }

    public GuiVanBan(id: string) {
        this.hienThiGuiVanBan = true;
        this.id = id;
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa văn bản?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.xoaVanBanDi(id, this.idDonViLamViec).subscribe(
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
