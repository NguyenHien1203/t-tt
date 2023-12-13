import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-co-quan.service';
import { TimKiemQuanLyHoSoCoQuan } from 'src/app/models/ho-so-cong-viec/quan-ly-ho-so-co-quan';

@Component({
  selector: 'app-quan-ly-ho-so-co-quan',
  templateUrl: './quan-ly-ho-so-co-quan.component.html',
  styleUrls: ['./quan-ly-ho-so-co-quan.component.scss'],
  providers : [MessageService, ConfirmationService]
})
export class QuanLyHoSoCoQuanComponent {
  constructor(
    private messageService: MessageService,
    private service: QuanLyHoSoCoQuanService,
    private authService: AuthService,
    private confirmService: ConfirmationService,
    private router: Router,
    private cd: ChangeDetectorRef
) {}

idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
lstNam: SelectItem[] = [];
lstThang: SelectItem[] = [];
timChinhXac: boolean = false;
public id: string = '1';
loading: boolean = false;
lstTrangThai: any = [];
lstLoaiHoSo: any = [];
lstHoSoCaNhan: any[] = [];
items = [{ label: 'Hồ sơ công việc' }, { label: 'Quản lý hồ sơ công việc cơ quan' }];
home = { icon: 'pi pi-home', routerLink: '/' };
timKiemDanhSach: TimKiemQuanLyHoSoCoQuan = {
    keyWord: '',
    nam : 0,
    thang : 0, 
    loaiHoSo : 0,
    trangThai : 0,
    userId: Number(this.idUser),
    timChinhXac: 0,
};

ngAfterContentChecked(): void {
    this.cd.detectChanges();
}

ngOnInit(): void {
    this.loading = false;
    this.LoadDanhSach();
}

public LoadDanhMuc() {
    this.service
        .getDanhSachLoaiHoSo(this.idDonViLamViec)
        .then((data) => (this.lstLoaiHoSo = data));

    const currentYear = new Date().getFullYear() + 1;
    for (let i = currentYear + 1; i >= currentYear - 5; i--) {
        this.lstNam.push({ label: 'Năm' + i, value: i });
    }

    for (let i = 1; i <= 12; i--) {
        this.lstThang.push({ label: 'Tháng ' + i, value: i });
    }
}

public LoadDanhSach(): void {
    this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
    this.service
        .getDanhSachHoSoCoQuan(this.timKiemDanhSach)
        .then((data) => {
            this.lstHoSoCaNhan = data;
        });
}

public ThemMoi() {
    this.router.navigate([
        './ho-so-cong-viec/quan-ly-ho-so-co-quan/them-moi',
    ]);
}

public CapNhat(id: string) {
    this.router.navigate(
        ['./ho-so-cong-viec/quan-ly-ho-so-co-quan/cap-nhat'],
        { queryParamsHandling: 'merge', queryParams: { id: id } }
    );
}

public Thoat(itemHt: any, loai: string): void {
    this.LoadDanhSach();
}

public Xoa(id: string) {
    this.confirmService.confirm({
        message: 'Bạn có chắc chắn xác nhận xóa hồ sơ?',
        header: 'Xác nhận',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.service.xoaHoSoCoQuan(id).subscribe(
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
