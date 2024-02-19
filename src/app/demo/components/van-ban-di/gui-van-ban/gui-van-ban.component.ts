import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { GuiVanBanService } from 'src/app/demo/service/van-ban-di/gui-van-ban.service';
import { TimKiemDanhSachGuiVanBan } from 'src/app/models/van-ban-di/gui-van-ban';

@Component({
    selector: 'app-gui-van-ban',
    templateUrl: './gui-van-ban.component.html',
    styleUrls: ['./gui-van-ban.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class GuiVanBanComponent {
    constructor(
        private messageService: MessageService,
        private service: GuiVanBanService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef
    ) {}

    lstChucNang = [
        { label: 'Thu hồi', icon: 'pi pi-undo', action: 'thuhoi' },
        { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'laylai' },
    ];

    isShowSearch: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    hienThiChiTiet : boolean = false;
    hienThiPhanPhoi: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiGuiVanBan: boolean = false;
    hienThiThuHoi: boolean = false;
    hienThiLayLai: boolean = false;
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    capNhatMois: any[] = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Gửi văn bản đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstTrangThai: any[] = [
        { text: 'Chờ phát hành', value: '8' },
        { text: 'Đã phát hành', value: '1' },
        { text: 'Đã gửi', value: '2' },
        { text: 'Đang xử lý', value: '10' },
        { text: 'Đã xử lý', value: '11' },
    ];
    lstMucDoKhan: any[] = [
        { text: 'VB thường', value: '1' },
        { text: 'VB khẩn, hỏa tốc', value: '2' },
        { text: 'VB mật', value: '3' },
        { text: 'VB tuyệt mật', value: '4' },
        { text: 'VB tối mật', value: '5' },
    ];
    timKiemDanhSach: TimKiemDanhSachGuiVanBan = {
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
        soKyHieu: '',
        lanhDaoKyId: 0,
        soDi: null,
        pageIndex: 0,
        pageSize: 0,
        trichYeu: '',
        timChinhXac: 0,
        trangThai : 1,
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

    public handleClick(action: string, id: string) {
        if (action === 'thuhoi') this.ThuHoi(id);
        if (action === 'laylai') this.LayLai(id);
    }

    public ThuHoi(id: string) {
        this.hienThiThuHoi = true;
        this.id = id;
    }

    public LayLai(id: string) {
        this.hienThiLayLai = true;
        this.id = id;
    }

    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public changeSoVanBan(event) {
        this.lstLoaiVanBan = [];
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

    public CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiCapNhat = false;
        if (loai === 'G') this.hienThiGuiVanBan = false;
        if (loai === 'P') this.hienThiPhanPhoi = false;
        if (loai === 'T') this.hienThiThuHoi = false;
        if (loai === 'L') this.hienThiLayLai = false;
        if (loai === 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public PhanPhoi(id: string) {
        this.hienThiPhanPhoi = true;
        this.id = id;
    }

    public ChiTiet(id: string)
    {
        this.id = id;
        this.hienThiChiTiet = true;
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

    public ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }
}
