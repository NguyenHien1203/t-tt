import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { MucDoTruyCapService } from 'src/app/demo/service/thong-ke/muc-do-truy-cap.service';
import { VanBanNhanService } from 'src/app/demo/service/thong-ke/van-ban-nhan.service';
import { TimKiemMucDoTruyCap } from 'src/app/models/thong-ke/muc-do-truy-cap';

@Component({
  selector: 'app-muc-do-truy-cap',
  templateUrl: './muc-do-truy-cap.component.html',
  styleUrls: ['./muc-do-truy-cap.component.scss']
})
export class MucDoTruyCapComponent {
  constructor(
    private messageService: MessageService,
    private service: MucDoTruyCapService,
    private vanBanNhanService: VanBanNhanService,
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
timKiemDanhSach: TimKiemMucDoTruyCap = {
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

public LoadDonVi(){
  this.vanBanNhanService.getDanhSachDonVi().then(data => this.lstDonVi = data);
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
