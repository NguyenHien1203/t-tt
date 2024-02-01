import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/duyet-ban-giao-cong-viec/duyet-ban-giao-cong-viec.service';
import { TimKiemDanhSachDBGCV } from 'src/app/models/cong-viec/duyet-ban-giao-cong-viec';

@Component({
    selector: 'app-duyet-ban-giao-cong-viec',
    templateUrl: './duyet-ban-giao-cong-viec.component.html',
    styleUrls: ['./duyet-ban-giao-cong-viec.component.scss'],
    providers: [MessageService, ConfirmationService],
}) 
export class DuyetBanGiaoCongViecComponent {
    constructor(
        private service: DuyetBanGiaoCongViecService,
        private messageService: MessageService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {}

    hienThiTuChoi: boolean = false;
    id: any = '';

    loaiVanBan: SelectItem[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    loading: boolean = false;
    traCuuDonGians: any[] = [];
    public home = { icon: 'pi pi-home', routerLink: '/' };
    public items = [
        { label: 'Quản lý công việc' },
        { label: 'Danh sách bàn giao công việc' },
    ];
    public timKiemDanhSach: TimKiemDanhSachDBGCV = {
        nguoiBanGiao: '',
        nguoiNhanBanGiao: '',
        noiDungBanGiao: '',
        tuNgay: '1901-01-01',
        denngay: '9999-01-01',
        nguoiNhanId: Number(this.idUser),
        timChinhXac: 0,
    };

    ngOnInit(): void {
        this.loading = false;
        this.LoadDanhSach();
        console.log('qưđưq', this.authService.GetmUserInfo().donViId);
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachBGCV(this.timKiemDanhSach).then((data) => {
            console.log(data);
            this.traCuuDonGians = data;
        });
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    public duyetCongViec(idVanBan: string) {
        this.confirmService.confirm({
            message: 'Bạn chắc chắn duyệt đề xuất bàn giao công việc ?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.DuyetCongViec(idVanBan).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: data.title,
                            });
                            this.LoadDanhSach();
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

    public TuChoiVanBan(idVanBan: string) {
        this.hienThiTuChoi = true;
        this.id = idVanBan;
    }

    public Thoat(item: any, type: string): void {
      if (type === 'C')
        this.hienThiTuChoi = false;
      else
        this.hienThiTuChoi = false;
      this.LoadDanhSach();
    }
}
