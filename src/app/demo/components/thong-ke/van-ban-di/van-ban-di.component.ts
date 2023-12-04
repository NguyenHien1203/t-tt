import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanDiService } from 'src/app/demo/service/thong-ke/van-ban-di.service';
import { VanBanNhanService } from 'src/app/demo/service/thong-ke/van-ban-nhan.service';
import { TimKiemVanBanDi } from 'src/app/models/thong-ke/van-ban-di';

@Component({
    selector: 'app-van-ban-di',
    templateUrl: './van-ban-di.component.html',
    styleUrls: ['./van-ban-di.component.scss'],
    providers : [MessageService]
})
export class VanBanDiComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanDiService,
        private vanBanNhanService: VanBanNhanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    lstThang: SelectItem[] = [];
    lstNam: SelectItem[] = [];
    lstDonVi: any[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public id: string = '1';
    loading: boolean = false;
    lstVanBanDi: any[] = [];
    items = [{ label: 'Thống kê' }, { label: 'Thống kê văn bản đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemVanBanDi = {
        donViId: Number(this.idDonViLamViec),
        userId: 0,
        nam: 0,
        thang: 0,
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.loading = false;
        this.LoadThangNam();
        this.LoadDonVi();
        this.LoadDanhSach();
    }

    public LoadDonVi() {
        this.vanBanNhanService.getDanhSachDonVi().then((data) => (this.lstDonVi = data));
    }

    public LoadThangNam() {
        for (let i = 1; i <= 12; i++) {
            this.lstThang.push({ label: 'Tháng ' + i, value: i });
        }
        let year = new Date().getFullYear() + 1;
        for (let i = year; i >= year - 5; i--) {
            this.lstNam.push({ label: 'Năm ' + i, value: i });
        }
    }

    public LoadDanhSach(): void {
        this.service
            .getDanhSachThongKeVanBanDi(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanDi = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        this.LoadDanhSach();
    }
}
