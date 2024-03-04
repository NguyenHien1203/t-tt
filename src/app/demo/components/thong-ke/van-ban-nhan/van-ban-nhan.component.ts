import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute,Data  } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanNhanService } from 'src/app/demo/service/thong-ke/van-ban-nhan.service';
import { TimKiemVanBanNhan } from 'src/app/models/thong-ke/van-ban-nhan';

@Component({
    selector: 'app-van-ban-nhan',
    templateUrl: './van-ban-nhan.component.html',
    styleUrls: ['./van-ban-nhan.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VanBanNhanComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanNhanService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
    ) {}

    lstThang: SelectItem[] = [];
    lstNam: SelectItem[] = [];
    lstDonVi: any[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public id: string = '1';
    loading: boolean = false;
    lstVanBanNhan: any[] = [];
    items = [{ label: 'Thống kê' }, { label: 'Thống kê văn bản nhận' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemVanBanNhan = {
        donViId: 0,
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

    public LoadDonVi(){
      this.service.getDanhSachDonVi().then(data => this.lstDonVi = data);
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
            .getDanhSachMucDoTruyCap(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanNhan = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        this.LoadDanhSach();
    }
}
