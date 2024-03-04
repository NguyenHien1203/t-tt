import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { format, isThisSecond } from 'date-fns';
import { throwError, filter } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { QuanLyHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-co-quan.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { AuthService } from 'src/app/common/auth.services';
import { Router } from '@angular/router';
import { DanhMucHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-co-quan.service';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
    providers: [MessageService],
})
export class ThemMoiComponent {
    constructor(
        private formBuilder: FormBuilder,
        private service: QuanLyHoSoCoQuanService,
        private danhMucHoSoCoQuanService: DanhMucHoSoCoQuanService,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {}

    items: any[] = [
        { label: 'Hồ sơ công việc' },
        { label: 'Quản lý hồ sơ công việc cơ quan' },
        { label: 'Thêm mới' },
    ];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    loading: boolean = true;
    hienThiChonVanBan: boolean = false;
    hienThiChonCongViec: boolean = false;
    hienThiChonPhieuTrinh: boolean = false;
    checkAllXem: boolean = false;
    checkAllVanBan: boolean = false;
    checkAllCongViec: boolean = false;
    phongBanId: number;
    nhomNguoiDungId: number;
    chonNhanhUser: number;
    selectedFiles: any[] = [];
    selectedNodes: TreeNode = null;
    lstDmHoSo: TreeNode[] = [];
    selectedNguoiDung: any[] = [];
    lstLoaiHoSo: any[] = [];
    lstPhongBan: any[] = [];
    lstPhanQuyen: any[] = [];
    lstNhomNguoiDung: any[] = [];
    lstUserChonNhanh: any[] = [];
    lstVanBanLienQuan: any[] = [];
    lstUserNhan: any[] = [];
    lstCongViecLienQuan: any[] = [];
    lstPhieuTrinhLienQuan: any[] = [];
    lstTrangThai: any[] = [
        { text: 'Chưa xử lý', value: 1 },
        { text: 'Đang xử lý', value: 2 },
        { text: 'Xử lý xong', value: 3 },
        { text: 'Quá hạn xử lý', value: 4 },
    ];
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    phongBanName: string = this.authService.GetmUserInfo()?.tenDonVi ?? '0';
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        danhMucHoSoId: [0, [Validators.required]],
        loaiHoSoId: [, [Validators.required]],
        maHoSo: ['', []],
        tieuDe: ['', [Validators.required]],
        ngayNhap: [new Date(), []],
        thoiHanBaoQuan: ['', []],
        ngayBatDau: [new Date(), []],
        ngayKetThuc: [new Date(), []],
        soKyHieu: ['', [Validators.required]],
        nguoiLap: ['', []],
        dacDiem: ['', []],
        trangThai: [1, []],
        ghiChu: ['', []],
        tongSoVanBan: ['', [Validators.required]],
        tongSoTrang: ['', [Validators.required]],
        lstFile: [, []],
    });

    ngOnInit() {
        this.loading = false;
        this.LoadDanhMuc();
    }

    public LoadDanhMuc() {
        this.danhMucHoSoCoQuanService
            .getDanhSachDanhMucHoSoCoQuan(this.idDonViLamViec)
            .then((data) => {
                if (data.isError) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'error',
                        detail: data.title,
                    });
                } else {
                    this.lstDmHoSo = data;
                }
            });

        this.service
            .getDanhSachLoaiHoSo(this.idDonViLamViec)
            .then((data) => (this.lstLoaiHoSo = data));

        this.service
            .getDanhSachPhongBan(this.idDonViLamViec)
            .then((data) => (this.lstPhongBan = data));

        this.service
            .getDanhSachNhomNguoiDung(
                this.idDonViLamViec,
                this.idPhongBan,
                this.idUser
            )
            .then((data) => (this.lstNhomNguoiDung = data));

        this.service
            .getDanhSachChonNhanhNguoiDung(this.idDonViLamViec, this.idUser)
            .then((data) => (this.lstUserChonNhanh = data));

        this.formThemMoi.patchValue({
            nguoiLap: this.userFullName,
        });
    }

    public ChangeThoiHanBaoQuan() {
        this.service
            .getNgayKetThucHoSo(
                this.formThemMoi.value.thoiHanBaoQuan,
                format(this.formThemMoi.value.ngayBatDau, 'dd/MM/yyyy')
            )
            .then((data) => {
                this.formThemMoi.patchValue({
                    ngayKetThuc: new Date(data),
                });
            });
    }

    public ChonDoiTuong(): void {
        const sltNguoiDung = this.lstUserNhan
            .filter((data) => this.selectedNguoiDung.includes(data.value))
            .map((data) => {
                return {
                    hoVaTen: data.text,
                    value: data.value,
                    xem: false,
                    vb: false,
                    cv: false,
                };
            });
        this.lstPhanQuyen = this.lstPhanQuyen.concat(sltNguoiDung);
        const lstTmp = this.lstUserNhan.filter(
            (data) => !this.selectedNguoiDung.includes(data.value)
        );
        this.lstUserNhan = lstTmp;

        this.lstPhanQuyen = this.RemoveDuplicates(this.lstPhanQuyen, 'value');
    }

    public ChangePhongBan(event): void {
        this.nhomNguoiDungId= null;
        this.chonNhanhUser = null;
        if (event != null) {
            this.service
                .getDanhSachUserThuocPhongBan(event, this.idUser)
                .then((data) => {
                    this.lstUserNhan = data ?? [];
                });
        }
    }

    public ChangeNhomNguoiDung(event): void {
        this.phongBanId= null;
        this.chonNhanhUser = null;
        if (event != null) {
            this.service
                .getDanhSachUserThuocNhomNguoiDung(event, this.idUser)
                .then((data) => {
                    this.lstUserNhan = data ?? [];
                });
        }
    }

    public ChangeUserChonNhanh(event): void {
        this.nhomNguoiDungId= null;
        this.phongBanId = null;
        if (event != null) {
            let objUser = this.lstUserChonNhanh.filter(
                (data) => data.value == event
            );
            this.lstUserNhan = [];
            this.lstUserNhan = this.lstUserNhan.concat(objUser);
        }
    }

    public ChangeSoKyHieu() {
        this.service
            .getMaHoSoCoQuan(
                this.formThemMoi.value.soKyHieu,
                this.idDonViLamViec
            )
            .then((data) => {
                this.formThemMoi.patchValue({
                    maHoSo: data,
                });
            });
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            event.target.value = '';
            let urlSave = '/HoSoCongViec/QuanLyHoSoCoQuan/UpLoadFile';
            this.fileService.uploadFiles(FileInput, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Tải lên thất bại',
                        });
                    else {
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: 'Tải lên thành công',
                        });
                        const fileReturn = {
                            isNew: true,
                            isDelete: false,
                            fileName: data.objData.fileName,
                            filePath: data.objData.filePath,
                        };
                        this.selectedFiles.push(fileReturn);
                    }
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/HoSoCongViec/QuanLyHoSoCoQuan/DownloadFile';
        this.fileService
            .downloadFile(filepath, filename, urlDownLoad)
            .subscribe(
                (data) => {
                    const blob = new Blob([data], {
                        type: 'application/octet-stream',
                    });
                    saveAs(blob, filename);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Tải tệp thành công',
                    });
                },
                (error: any) => {
                    if (error.status === 404) {
                        // Xử lý lỗi 404 (NotFound)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Không tìm thấy đường dẫn file',
                        });
                        // Ví dụ: Hiển thị thông báo lỗi cho người dùng
                    } else {
                        // Xử lý các lỗi khác
                        console.error('Đã xảy ra lỗi', error);
                        // Thực hiện các hành động tương ứng
                    }
                    return throwError(() => error);
                }
            );
    }

    public XoaFile(filePath: string): void {
        this.selectedFiles.forEach((obj, index) => {
            if (obj.filePath === filePath) {
                obj.isDelete = true;
                obj.isNew = false;
            }
        });
    }

    public GanVanBan(): void {
        this.hienThiChonVanBan = true;
    }

    public GanCongViec(): void {
        this.hienThiChonCongViec = true;
    }

    public GanPhieuTrinh(): void {
        this.hienThiChonPhieuTrinh = true;
    }

    public XoaAllUser(): void {
        this.lstPhanQuyen = [];
    }

    public ThemMoi() {
        this.submitted = true;

        if (this.formThemMoi.valid) {
            let itemData = this.formThemMoi.value;
            let hoSoCongViecCaNhan = {
                id: 0,
                danhMucHoSoId: this.selectedNodes.data,
                loaiHoSoId: itemData.loaiHoSoId,
                maHoSo: itemData.maHoSo,
                tieuDe: itemData.tieuDe,
                ngayNhap: format(itemData.ngayNhap, 'dd/MM/yyyy'),
                thoiHanBaoQuan: itemData.thoiHanBaoQuan?.toString(),
                ngayBatDau: format(itemData.ngayBatDau, 'dd/MM/yyyy'),
                ngayKetThuc: format(itemData.ngayKetThuc, 'dd/MM/yyyy'),
                soKyHieu: itemData.soKyHieu,
                nguoiLap: this.idUser,
                donViId: this.idDonViLamViec,
                phongBanId: this.idPhongBan,
                dacDiem: itemData.dacDiem,
                trangThai: itemData.trangThai,
                ghiChu: itemData.ghiChu,
                tongSoVanBan: itemData.tongSoVanBan,
                tongSoTrang: itemData.tongSoTrang,
                lstFile: this.selectedFiles,
                lstVanBanDinhKem: this.lstVanBanLienQuan.map((data) => data.id),
                lstCongViecDinhKem: this.lstCongViecLienQuan.map(
                    (data) => data.id
                ),
                lstPhanPhoi: this.lstPhanQuyen,
            };

            this.service.themMoiHoSoCoQuan(hoSoCongViecCaNhan).subscribe(
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
                        setTimeout(() => {
                            this.ReturnTrangChu();
                        }, 2000);
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Kiểm tra lại thông tin bắt buộc',
            });
        }
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai == 'VB') this.hienThiChonVanBan = false;
        if (loai == 'CV') this.hienThiChonCongViec = false;
        if (loai == 'PT') this.hienThiChonPhieuTrinh = false;
    }

    public NhapLai() {
        this.formThemMoi.reset();
        this.submitted = false;
    }

    public ReturnTrangChu() {
        this.router.navigate(['/ho-so-cong-viec/quan-ly-ho-so-co-quan']);
    }

    public ChonPhieuTrinh(event): void {
        this.lstPhieuTrinhLienQuan = this.RemoveDuplicates(
            this.lstPhieuTrinhLienQuan.concat(event),
            'id'
        );
    }

    public ChonVanBan(event): void {
        this.lstVanBanLienQuan = this.RemoveDuplicates(
            this.lstVanBanLienQuan.concat(event),
            'id'
        );
    }

    public ChonCongViec(event): void {
        this.lstCongViecLienQuan = this.RemoveDuplicates(
            this.lstCongViecLienQuan.concat(event),
            'id'
        );
    }

    public XoaCongViec(id): void {
        this.lstCongViecLienQuan = this.lstCongViecLienQuan.filter(
            (data) => data.id != id
        );
    }

    public XoaPhieuTrinh(id): void {
        this.lstPhieuTrinhLienQuan = this.lstPhieuTrinhLienQuan.filter(
            (data) => data.id != id
        );
    }

    public XoaVanBan(id): void {
        this.lstVanBanLienQuan = this.lstVanBanLienQuan.filter(
            (data) => data.id != id
        );
    }

    public CheckAllXem(): void {
        this.checkAllXem = !this.checkAllXem;
        this.lstPhanQuyen = this.lstPhanQuyen.map((data) => {
            return { ...data, xem: this.checkAllXem };
        });
    }

    public CheckAllVanBan(): void {
        this.checkAllVanBan = !this.checkAllVanBan;
        this.lstPhanQuyen = this.lstPhanQuyen.map((data) => {
            return { ...data, vb: this.checkAllVanBan };
        });
    }

    public CheckAllCongViec(): void {
        this.checkAllCongViec = !this.checkAllCongViec;
        this.lstPhanQuyen = this.lstPhanQuyen.map((data) => {
            return { ...data, cv: this.checkAllCongViec };
        });
    }

    public CheckItemXem(item): void {
        item.xem = !item.xem;

        this.checkAllXem =
            this.lstPhanQuyen.filter((data) => data.xem == true).length ==
            this.lstPhanQuyen.length;
    }

    public CheckItemVanBan(item): void {
        item.vb = !item.vb;

        this.checkAllVanBan =
            this.lstPhanQuyen.filter((data) => data.vb == true).length ==
            this.lstPhanQuyen.length;
    }

    public CheckItemCongViec(item): void {
        item.cv = !item.cv;

        this.checkAllCongViec =
            this.lstPhanQuyen.filter((data) => data.cv == true).length ==
            this.lstPhanQuyen.length;
    }

    RemoveDuplicates(arr, prop) {
        const uniqueSet = new Set(arr.map((item) => item[prop]));
        return Array.from(uniqueSet).map((uniqueProp) =>
            arr.find((item) => item[prop] === uniqueProp)
        );
    }

    public XoaPhanQuyenItem(item) {
        this.lstUserNhan.unshift({ text: item.hoVaTen, value: item.value });
        this.lstPhanQuyen = this.lstPhanQuyen.filter(
            (data) => data.value != item.value
        );
    }
}
