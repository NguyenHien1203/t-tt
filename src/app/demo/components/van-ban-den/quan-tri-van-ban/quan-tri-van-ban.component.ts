import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    ConfirmationService,
    MenuItem,
    Message,
    MessageService,
    SelectItem,
} from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriVanBanService } from 'src/app/demo/service/van-ban-den/quan-tri-van-ban/quan-tri-van-ban.service';
import {
    QuanTriVanBanDen,
    TimKiemModel,
} from 'src/app/models/van-ban-den/quan-tri-van-ban.model';

@Component({
    selector: 'app-quan-tri-van-ban',
    templateUrl: './quan-tri-van-ban.component.html',
    styleUrls: ['./quan-tri-van-ban.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class QuanTriVanBanComponent implements OnInit {
    // Khai báo tiếp nhận
    hienThiTiepNhan: boolean = false;
    hienthiTuChoi: boolean = false;
    hienthiSuaVanBan: boolean = false;
    hienthiPhanPhoi: boolean = false;
    
    idVanBan: string = '';
    // end

    breadcrumbItems: MenuItem[] = [];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    trangThaiButton: any = 'Tìm kiếm nâng cao';
    iconButton: any = 'pi pi-arrow-down';

    hienThi: boolean = false;
    luaChonNam: SelectItem[] = []; // Lựa chọn năm
    luaChonThang: SelectItem[] = []; // Lựa chọn tháng
    luaChonTrangThai: SelectItem[] = []; // Lựa chọn trạng thái
    luaChonMucDo: SelectItem[] = []; // Lựa chọn mức độ văn bản
    lstLoaiVanBan: any = [];
    lstSoVanBan: any = [];

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idDonViLVCha: string = this.authService.GetmUserInfo().donViIdCha ?? '0';
    timChinhXac: boolean = false;
    timKiemDanhSach: TimKiemModel = {
        trangthai: 0,
        nam: 0,
        thang: 0,
        sokihieu: '',
        TimChinhXac: 0,
        idsovb: 0,
        idloaivb: 0,
        ngtn: new Date(),
        ngdn: new Date(),
        bhtn: new Date(),
        bhdn: new Date(),
        sodiden: 0,
        cqbh: '',
        cqbhid: 0,
        trichyeu: '',
        ky: '',
        vbdiden: 0,
        iddonvi: 0,
        ItemId: 0,
        mucdo: 0,
        soan: '',
        ghichu: '',
        vanban: '',
        iPhanLoaiDV: 0,
        cap: 0,

        donViId: Number(this.idDonViLamViec),
    };

    danhSachVanBanDen: QuanTriVanBanDen[] = [];
    vanBanDen: QuanTriVanBanDen = {};
    idVanBanDi: string = '1';

    msgs: Message[] = [];
    // hienThiDrop: boolean;

    lstChucNangVBD = [
        { label: 'Cập nhật', icon: 'pi pi-sync', action: 'capNhat' },
        { label: 'Thu hồi', icon: 'pi pi-backward', action: 'thuHoi' },
        { label: 'Lấy lại', icon: 'pi pi-sign-in', action: 'layLai' },
        { label: 'Thay thế', icon: 'pi pi-replay', action: 'thayThe' },
    ];

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private Service: QuanTriVanBanService,
        private cd: ChangeDetectorRef,
        private confirmService: ConfirmationService,
    ) {}

    ngAfterContentChecked() {
        this.cd.detectChanges();
    }

    ngOnInit() {
        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Văn bản đi' });
        this.breadcrumbItems.push({ label: 'Quản trị văn bản đi' });

        // this.hienThiDrop = false;

        this.GetLoaiVanBan();
        this.GetSoVanBan();
        this.GetNam();
        this.GetThang();
        this.GetTrangThai();
        this.GetMucDoVanBan();

        this.TimKiem(this.timKiemDanhSach);
    }

    // Kiểm tra true false tìm chính xác
    public TimChinhXac() {
        this.timChinhXac = !this.timChinhXac;
    }

    // Tìm kiếm danh sách
    public TimKiem(timkiems: TimKiemModel) {
        this.timKiemDanhSach.TimChinhXac = this.timChinhXac ? 1 : 0;
        this.Service.getDanhSachvanBan(timkiems).then((data) => {
            this.danhSachVanBanDen = data;
        });
    }

    // Hiển thị tìm kiếm nâng cao
    HienThiTimKiem() {
        this.hienThi = !this.hienThi;

        if (this.hienThi) {
            this.trangThaiButton = 'Thu gọn tìm kiếm';
            this.iconButton = 'pi pi-arrow-up';
        } else {
            this.trangThaiButton = 'Tìm kiếm nâng cao';
            this.iconButton = 'pi pi-arrow-down';
        }
    }

    // Danh sách loại văn bản ở phần tìm kiếm
    GetLoaiVanBan() {
        this.Service.getLoaiVanBan(this.idDonViLamViec).subscribe(
            (data) => {
                if (data.isError) {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        detail: 'Không tìm thấy dữ liệu',
                    });
                } else {
                    this.lstLoaiVanBan = data;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    // Danh sách sổ văn bản ở phần tìm kiếm
    GetSoVanBan() {
        this.Service.getSoVanBan(this.idDonViLamViec).subscribe(
            (data) => {
                if (data.isError) {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        detail: 'Không tìm thấy dữ liệu',
                    });
                } else {
                    this.lstSoVanBan = data;
                }
            },
            (error) => {
                console.log('Error', error);
            }
        );
    }

    // Lấy dữ liệu số năm cho phép lựa chọn
    GetNam() {
        this.luaChonNam.push({ label: '--Chọn năm--', value: 0 });
        const soNam = new Date().getFullYear();
        for (let i = soNam + 1; i >= soNam - 5; i--) {
            this.luaChonNam.push({ label: i.toString(), value: i });
        }
    }

    //Lấy dữ liệu số tháng lựa chọn
    GetThang() {
        this.luaChonThang.push({ label: '--Chọn tháng--', value: 0 });
        const soThang = new Date().getMonth();
        for (let i = 1; i <= soThang + 2; i++) {
            this.luaChonThang.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
    }

    //Tạo dữ liệu trạng thái
    GetTrangThai() {
        this.luaChonTrangThai.push({ label: '--Chọn trạng thái--', value: 0 });
        this.luaChonTrangThai.push({ label: 'Chờ phát hành', value: 8 });
        this.luaChonTrangThai.push({ label: 'Đã phát hành', value: 1 });
        this.luaChonTrangThai.push({ label: 'Đã gửi', value: 2 });
        this.luaChonTrangThai.push({ label: 'Thay thế', value: 14 });
        this.luaChonTrangThai.push({ label: 'Bị thay thế', value: 15 });
        this.luaChonTrangThai.push({ label: 'Cập nhật', value: 17 });
        this.luaChonTrangThai.push({ label: 'Lấy lại', value: 18 });
        this.luaChonTrangThai.push({ label: 'Thu hồi', value: 21 });
        this.luaChonTrangThai.push({ label: 'Bị thu hồi', value: 24 });
        this.luaChonTrangThai.push({ label: 'Đang xử lý', value: 10 });
        this.luaChonTrangThai.push({ label: 'Đã xử lý', value: 11 });
    }

    //Tạo dữ liệu mức độ văn bản
    GetMucDoVanBan() {
        this.luaChonMucDo.push({ label: '--Chọn mức độ--', value: 0 });
        this.luaChonMucDo.push({ label: 'VB thường', value: 1 });
        this.luaChonMucDo.push({ label: 'VB khẩn, hỏa tốc', value: 2 });
        this.luaChonMucDo.push({ label: 'VB mật', value: 3 });
        this.luaChonMucDo.push({ label: 'VB tuyệt mật', value: 4 });
        this.luaChonMucDo.push({ label: 'VB tối mật', value: 5 });
    }

    //Chi tiết văn bản
    hienThiChiTiet: boolean = false;

    ChiTietVanBan(id: string) {
        this.hienThiChiTiet = true;
        this.idVanBanDi = id;
    }

    Thoat(item: any, type: string) {
        if (type === 'TN') {
            this.hienThiTiepNhan = false;
        } else if (type === 'TC') {
            this.hienthiTuChoi = false;
        } else if (type === 'SVB') {
            this.hienthiSuaVanBan = false;
        }
        this.TimKiem(this.timKiemDanhSach);
    }

    //-------------------------------------------------------------------------------------
    //#region  Tiếp nhận văn bản
    /**
     * TiepNhanVanBan
     */
    public TiepNhanVanBan(id: string): void {
        this.hienThiTiepNhan = true;
        this.idVanBan = id;
    }
    //#endregion

    //#region Từ chối văn bản
    /**
     * TuChoiVanBan
     */
    public TuChoiTiepNhan(id: string): void {
        this.hienthiTuChoi = true;
        this.idVanBan = id;
    }
    //#endregion

    //#region Sửa văn bản
    /**
     * SuaVanBan
     */
    public SuaVanBan(id: string): void {
        this.hienthiSuaVanBan = true;
        this.idVanBan = id;
    }
    //#endregion

    //#region phân phối văn bản
    /**
     * SuaVanBan
     */
    public PhanPhoiVanBan(id: string): void {
        this.hienthiPhanPhoi = true;
        this.idVanBan = id;
    }
    //#endregion

    //#region tải văn bản
    /**
     * TaiVanBan
     */
    public TaiVanBan(id : string): void {
        this.Service.TaiVanBan(id).subscribe(data => {
            if (data.isError) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: data.title,
                });
            } else {
                // this.TimKiem(this.timKiemDanhSach);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: data.title,
                });
            }
        })
      }
      // 
    //#endregion

    
    //#region tải văn bản
    /**
     * XoaVanBan
     */
    public Xoa(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa văn bản?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.Service.xoaVanBanDi(id, this.idDonViLamViec).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.TimKiem(this.timKiemDanhSach);
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
      // 
    //#endregion
}
