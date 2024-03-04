import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanChoThuHoiService } from 'src/app/demo/service/van-ban-den/van-ban-cho-thu-hoi/van-ban-cho-thu-hoi.service';
import { TimKiemDanhSachThuHoi } from 'src/app/models/van-ban-den/van-ban-cho-thu-hoi';

@Component({
  selector: 'app-van-ban-cho-thu-hoi',
  templateUrl: './van-ban-cho-thu-hoi.component.html',
  styleUrls: ['./van-ban-cho-thu-hoi.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class VanBanChoThuHoiComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanChoThuHoiService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private confirmService: ConfirmationService
    ) {}

    itemMenus = [
        { label: 'Tab 1', icon: 'pi pi-box', command: () => this.tabClick(0) },
        { label: 'Tab 2', icon: 'pi pi-box', command: () => this.tabClick(1) },
        { label: 'Tab 3', icon: 'pi pi-box', command: () => this.tabClick(2) },
    ];

    activeItem = this.itemMenus[0];

    tabClick(tabLabel: number): void {
        this.activeItem = this.itemMenus[tabLabel];
        console.log(`Clicked on ${tabLabel}`);
        // Additional logic for tab click
    }

    lstChucNang = [
        { label: 'Thu hồi', icon: 'pi pi-undo', action: 'thuhoi' },
        { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'laylai' },
    ];
    
    deleteProductDialog: boolean = false;
    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    Cap: string = this.authService.GetmUserInfo().cap ?? '0';
    userId: string = this.authService.GetmUserInfo().userId ?? '0';
    timChinhXac: boolean = false;
    loading: boolean = false;
    lstCoQuan: any = [];
    lstVanBanDi: any[] = [];
    items = [{ label: 'Văn bản đến' }, { label: 'Văn bản chờ thu hồi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    timKiemDanhSach: TimKiemDanhSachThuHoi = {
        donViId: Number(this.idDonViLamViec),
        tuNgay: '1901-01-01',
        denNgay: '9999-01-01',
        soKyHieu:'',
        trichYeu: '',
        timChinhXac : 0,
        cQBhId : 0,
        cap: Number(this.Cap),
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    ngOnInit(): void {
        this.GetCoQuan();
        this.loading = false;
        this.LoadDanhSach();
    }

    public GetCoQuan() {
        this.service.getCoQuan().then(
            (data) => {
                this.lstCoQuan = data;
            }
        );
    }

    public LoadDanhSach(): void {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service
            .getDanhSachChoThuHoi(this.timKiemDanhSach)
            .then((data) => {
                this.lstVanBanDi = data;
            });
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    public ThuHoi(id: string) {
        this.confirmService.confirm({
            message: 'Đồng ý thu hồi văn bản?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service
                    .ThuHoiVanBan(id,this.idDonViLamViec,this.userId)
                    .subscribe(
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
