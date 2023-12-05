import { VanBanNhanService } from 'src/app/demo/service/thong-ke/van-ban-nhan.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { XuLyCongViecService } from 'src/app/demo/service/thong-ke/xu-ly-cong-viec.service';
import { TimKiemXuLyCongViec } from 'src/app/models/thong-ke/xu-ly-cong-viec';

@Component({
    selector: 'app-xu-ly-cong-viec',
    templateUrl: './xu-ly-cong-viec.component.html',
    styleUrls: ['./xu-ly-cong-viec.component.scss'],
    providers: [MessageService],
})
export class XuLyCongViecComponent {
    constructor(
        private messageService: MessageService,
        private service: XuLyCongViecService,
        private vanBanNhanService: VanBanNhanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}
    lstDonVi: any;
    lstThang: SelectItem[] = [];
    lstNam: SelectItem[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public id: string = '1';
    loading: boolean = false;
    lstXuLyCongViec: any[] = [];
    items = [{ label: 'Thống kê' }, { label: 'Thống kê xử lý công việc' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemXuLyCongViec = {
        donViId: 0,
        userId: 0,
        nam: 0,
        thang: 0,
        keyWord: '',
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
        this.vanBanNhanService
            .getDanhSachDonVi()
            .then((data) => (this.lstDonVi = data));
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
            .getDanhSachXuLyCongViec(this.timKiemDanhSach)
            .then((data) => {
                this.lstXuLyCongViec = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        this.LoadDanhSach();
    }
}
