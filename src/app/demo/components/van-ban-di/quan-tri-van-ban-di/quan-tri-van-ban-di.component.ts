import { QuanTriVanBanDiService } from './../../../service/van-ban-di/quan-tri-van-ban-di/quan-tri-van-ban-di.service';
import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import {
    QuanTriVanBanDi,
    TimKiemVBDi,
} from 'src/app/models/van-ban-di/quan-tri-van-ban-di';
// import { MatMenuTrigger } from '@angular/material';

@Component({
    selector: 'app-quan-tri-van-ban-di',
    templateUrl: './quan-tri-van-ban-di.component.html',
    styleUrls: ['./quan-tri-van-ban-di.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class QuanTriVanBanDiComponent implements OnInit {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private service: QuanTriVanBanDiService,
        private capNhatMoiService: CapNhatMoiService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private confirmService: ConfirmationService
    ) {}
    items: any[] = [{ label: 'Văn bản đi' }, { label: 'Quản trị văn bản đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    hienThiThayThe: boolean = false;
    hienThiLayLai: boolean = false;
    hienThiThuHoi: boolean = false;
    hienThiCapNhat: boolean = false;
    hienThiPhanPhoi: boolean = false;
    hienThiGuiVanBan: boolean = false;
    hienThiChiTiet: boolean = false;
    breadcrumbItems: MenuItem[] = [];
    trangThaiButton: any = 'Tìm kiếm nâng cao';
    iconButton: any = 'pi pi-arrow-down';
    isShowSearch: boolean = false;
    lstNam: SelectItem[] = []; // Lựa chọn năm
    lstThang: SelectItem[] = []; // Lựa chọn tháng
    luaChonTrangThai: SelectItem[] = [
        { label: 'Chọn trạng thái', value: 0 },
        { label: 'Chờ phát hành', value: 8 },
        { label: 'Đã phát hành', value: 1 },
        { label: 'Đã gửi', value: 2 },
        { label: 'Thay thế', value: 14 },
        { label: 'Bị thay thế', value: 15 },
        { label: 'Cập nhật', value: 17 },
        { label: 'Lấy lại', value: 18 },
        { label: 'Thu hồi', value: 21 },
        { label: 'Bị thu hồi', value: 24 },
        { label: 'Đang xử lý', value: 10 },
        { label: 'Đã xử lý', value: 11 },
    ]; // Lựa chọn trạng thái
    luaChonMucDo: SelectItem[] = [
        { label: 'Chọn mức độ', value: 0 },
        { label: 'VB thường', value: 1 },
        { label: 'VB khẩn, hỏa tốc', value: 2 },
        { label: 'VB mật', value: 3 },
        { label: 'VB tuyệt mật', value: 4 },
        { label: 'VB tối mật', value: 5 },
    ]; // Lựa chọn mức độ văn bản
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idDonViLVCha: string = this.authService.GetmUserInfo().donViIdCha ?? '0';
    timChinhXac: boolean = false;
    timKiemDanhSach: TimKiemVBDi = {
        keyWord: '',
        soKyHieu: '',
        nam: 0,
        thang: 0,
        timChinhXac: 0,
        ngayBanHanh: '1901-01-01',
        ngayGui: '1901-01-01',
        loaiVanBanId: 0,
        soVanBanId: 0,
        trichYeu: '',
        trangThai: 0,
        mucDo: 0,
        soDi: null,
        vanBanId: 0,
        donViId: Number(this.idDonViLamViec),
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    danhSachVanBanDi: QuanTriVanBanDi[] = [];
    vanBanDi: QuanTriVanBanDi = {};
    id: string = '1';

    lstChucNang = [
        { label: 'Cập nhật', icon: 'pi pi-sync', action: 'capNhatVanBanDaGui' },
        { label: 'Thu hồi', icon: 'pi pi-backward', action: 'thuHoi' },
        { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'layLai' },
        { label: 'Thay thế', icon: 'pi pi-replay', action: 'thayThe' },
    ];

    ngOnInit() {
        this.GetDanhMuc();
        this.LoadDanhSach();
    }

    public GetDanhMuc(): void {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });

        this.lstNam.push({ label: 'Chọn năm', value: 0 });
        const year = new Date().getFullYear() + 1;
        for (let i = year; i >= year - 5; i--) {
            this.lstNam.push({ label: 'Năm ' + i.toString(), value: i });
        }

        this.lstThang.push({ label: 'Chọn tháng', value: 0 });
        for (let i = 1; i <= 12; i++) {
            this.lstThang.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
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

    // Kiểm tra true false tìm chính xác
    public TimChinhXac() {
        this.timChinhXac = !this.timChinhXac;
    }

    // Tìm kiếm danh sách
    public LoadDanhSach() {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.danhSachVanBanDi(this.timKiemDanhSach).then((data) => {
            this.danhSachVanBanDi = data;
        });
    }

    // Hiển thị tìm kiếm nâng cao
    ShowSearch() {
        this.isShowSearch = !this.isShowSearch;
    }

    ChiTietVanBan(id: string) {
        this.hienThiChiTiet = true;
        this.id = id;
    }

    GuiVanBan(id: string) {
        this.hienThiGuiVanBan = true;
        this.id = id;
    }

    CapNhatVanBanDaGui(id: string) {
        this.router.navigate(
            ['/van-ban-di/quan-tri-van-ban-di/cap-nhat-van-ban-da-gui'],
            {
                queryParamsHandling: 'merge',
                queryParams: { id: id },
            }
        );
    }

    PhanPhoi(id: string) {
        this.hienThiPhanPhoi = true;
        this.id = id;
    }

    CapNhat(id: string) {
        this.hienThiCapNhat = true;
        this.id = id;
    }

    ThuHoi(id: string) {
        this.hienThiThuHoi = true;
        this.id = id;
    }

    LayLai(id: string) {
        this.hienThiLayLai = true;
        this.id = id;
    }

    ThayThe(id: string) {
        this.hienThiThayThe = true;
        this.id = id;
    }

    public HandleClick(action: string, id: string) {
        if (action === 'capNhatVanBanDaGui') this.CapNhatVanBanDaGui(id);
        if (action === 'thuHoi') this.ThuHoi(id);
        if (action === 'layLai') this.LayLai(id);
        if (action === 'thayThe') this.ThayThe(id);
    }

    Thoat(item: any, type: string) {
        switch (type as any) {
            case 'CT': {
                this.hienThiChiTiet = false;
                break;
            }
            case 'G': {
                this.hienThiGuiVanBan = false;
                break;
            }
            case 'PP': {
                this.hienThiPhanPhoi = false;
                break;
            }
            case 'CN': {
                this.hienThiCapNhat = false;
                break;
            }
            case 'TH': {
                this.hienThiThuHoi = false;
                break;
            }
            case 'LL': {
                this.hienThiLayLai = false;
                break;
            }
            case 'TT': {
                this.hienThiThayThe = false;
                break;
            }
            default: {
                this.LoadDanhSach();
            }
        }
    }

    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa văn bản?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.capNhatMoiService
                    .xoaVanBanDi(id, this.idDonViLamViec)
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
