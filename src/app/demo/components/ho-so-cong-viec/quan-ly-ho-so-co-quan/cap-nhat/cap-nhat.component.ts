import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { format } from 'date-fns';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-co-quan.service';
import { DanhMucHoSoCoQuanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-co-quan.service';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
    providers: [MessageService],
})
export class CapNhatComponent {
    constructor(
        private formBuilder: FormBuilder,
        private service: QuanLyHoSoCoQuanService,
        private danhMucHoSoCoQuanService: DanhMucHoSoCoQuanService,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {}

    items: any[] = [
        { label: 'Hồ sơ công việc' },
        { label: 'Quản lý hồ sơ công việc cơ quan' },
        { label: 'Cập nhật' },
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
    isNguoiTaoHoSo: boolean = false;
    isDataReady: boolean = false;
    nhomNguoiDungId: number;
    chonNhanhUser: number;
    activeTab: number = 0;
    selectedFiles: any[] = [];
    selectedNodes: TreeNode = null;
    lstDmHoSo: TreeNode[] = [];
    selectedNguoiDung: any[] = [];
    lstQuyen: any[] = [];
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
    idNhomQuyen: string = this.authService.GetmUserInfo()?.nhomQuyenId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    phongBanName: string = this.authService.GetmUserInfo()?.tenDonVi ?? '0';
    public formCapNhat = this.formBuilder.group({
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
        this.BindData();
    }

    public async BindData() {
        try {
            await this.LoadDanhMuc();
            this.route.queryParams.subscribe(async (params) => {
                let id = params['id'];

                const data = await this.service.getHoSoCoQuanId(id);
                this.selectedNodes = this.findNodeByData(
                    this.lstDmHoSo,
                    data.danhMucHoSoId
                );

                this.formCapNhat.patchValue({
                    id: data.id,
                    loaiHoSoId: data.loaiHoSoId,
                    maHoSo: data.maHoSo,
                    tieuDe: data.tieuDe,
                    ngayNhap: new Date(data.ngayNhap),
                    thoiHanBaoQuan: data.thoiHanBaoQuan,
                    ngayBatDau: new Date(data.ngayBatDau),
                    nguoiLap: data.tenNguoiLap,
                    soKyHieu: data.soKyHieu,
                    dacDiem: data.dacDiem,
                    trangThai: data.trangThai,
                    ghiChu: data.ghiChu,
                    tongSoVanBan: data.tongSoVanBan,
                    tongSoTrang: data.tongSoTrang,
                });

                this.isNguoiTaoHoSo = data.nguoiLap == this.idUser;

                this.selectedFiles = data.lstFile.map((dt) => {
                    return { ...dt, isNew: false, isDelete: false };
                });
                this.lstVanBanLienQuan = data.lstVanBanDinhKem;
                this.lstCongViecLienQuan = data.lstCongViecDinhKem;
                this.lstPhanQuyen = data.lstHoSoCongViecPhanPhoi;

                this.ChangeThoiHanBaoQuan();

                const dataQuyen = await this.service.getDanhSachQuyen(
                    id,
                    this.idUser
                );
                if (dataQuyen != null) {
                    let arrQuyen = (dataQuyen.phanQuyen as string).split(',');
                    if (arrQuyen.length > 0) this.lstQuyen = arrQuyen;
                }

                this.isDataReady = true; //flag để tab đầu tiên active
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.activeTab = 0;
        }
    }

    findNodeByData(tree, searchData) {
        if (searchData === 0) {
            return null;
        }

        for (const node of tree) {
            if (node.data === searchData) {
                return node; // Trả về nếu tìm thấy nút
            }

            if (node.children && node.children.length > 0) {
                const foundInChild = this.findNodeByData(
                    node.children,
                    searchData
                );
                if (foundInChild) {
                    return foundInChild; // Trả về nếu tìm thấy trong các nút con
                }
            }
        }

        return null; // Trả về null nếu không tìm thấy
    }

    public async LoadDanhMuc() {
        try {
            const danhMucData =
                await this.danhMucHoSoCoQuanService.getDanhSachDanhMucHoSoCoQuan(
                    this.idDonViLamViec
                );
            this.lstDmHoSo = danhMucData;

            const loaiHoSoData = await this.service.getDanhSachLoaiHoSo(
                this.idDonViLamViec
            );
            this.lstLoaiHoSo = loaiHoSoData;

            const phongBanData = await this.service.getDanhSachPhongBan(
                this.idDonViLamViec
            );
            this.lstPhongBan = phongBanData;

            const nhomNguoiDungData =
                await this.service.getDanhSachNhomNguoiDung(
                    this.idDonViLamViec,
                    this.idPhongBan,
                    this.idUser
                );
            this.lstNhomNguoiDung = nhomNguoiDungData;

            const nhomNguoiDungChonNhanhData =
                await this.service.getDanhSachChonNhanhNguoiDung(
                    this.idDonViLamViec,
                    this.idUser
                );
            this.lstUserChonNhanh = nhomNguoiDungChonNhanhData;
        } catch (error) {
            console.log(error);
        }
    }

    public ChangeThoiHanBaoQuan() {
        this.service
            .getNgayKetThucHoSo(
                this.formCapNhat.value.thoiHanBaoQuan,
                format(this.formCapNhat.value.ngayBatDau, 'dd/MM/yyyy')
            )
            .then((data) => {
                this.formCapNhat.patchValue({
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
        if (event != null) {
            this.service
                .getDanhSachUserThuocPhongBan(event, this.idUser)
                .then((data) => {
                    this.lstUserNhan = data ?? [];
                });
        }
    }

    public ChangeNhomNguoiDung(event): void {
        if (event != null) {
            this.service
                .getDanhSachUserThuocNhomNguoiDung(event, this.idUser)
                .then((data) => {
                    this.lstUserNhan = data ?? [];
                });
        }
    }

    public ChangeUserChonNhanh(event): void {
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
                this.formCapNhat.value.soKyHieu,
                this.idDonViLamViec
            )
            .then((data) => {
                this.formCapNhat.patchValue({
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

    public XoaAllUser(): void {
        this.lstPhanQuyen = [];
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

    public CapNhat() {
        this.submitted = true;

        if (this.formCapNhat.valid) {
            let itemData = this.formCapNhat.value;
            let hoSoCongViecCaNhan = {
                id: itemData.id,
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

            this.service.capNhatHoSoCoQuan(hoSoCongViecCaNhan).subscribe(
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
        this.formCapNhat.reset();
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

const hoSoCongViecQuyen = {
    xem: 2,
    vb: 4,
    cv: 5,
};
