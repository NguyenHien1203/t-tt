import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/thong-ke/xu-ly-cong-viec.service';
import { TimKiemXuLyCongViec } from 'src/app/models/thong-ke/xu-ly-cong-viec';

@Component({
    selector: 'app-xu-ly-cong-viec',
    templateUrl: './xu-ly-cong-viec.component.html',
    styleUrls: ['./xu-ly-cong-viec.component.scss'],
    providers : [MessageService, ConfirmationService]
})
export class XuLyCongViecComponent {
    constructor(
        private messageService: MessageService,
        private service: XuLyCongViecService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiLuongXuLy: boolean = false;
    hienThiHoSo: boolean = false;
    hienThiGiaoViec: boolean = false;
    hienThiBaoCao: boolean = false;
    loading: boolean = false;
    lstCongViec: any[] = [];
    items = [{ label: 'Công việc' }, { label: 'Xử lý công việc' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemXuLyCongViec = {
        timChinhXac: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetDataYear();
        this.loading = false;
        this.LoadDanhSach();
    }

    public GetDataYear() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: i.toString(), value: i });
        }
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachXuLyCongViec(this.timKiemDanhSach)
            .then((data) => {
                this.lstCongViec = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'L') this.hienThiLuongXuLy = false;
        if (loai === 'H') this.hienThiHoSo = false;
        if (loai === 'G') this.hienThiGiaoViec = false;
        if (loai === 'B') this.hienThiBaoCao = false;
        this.LoadDanhSach();
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }
}
