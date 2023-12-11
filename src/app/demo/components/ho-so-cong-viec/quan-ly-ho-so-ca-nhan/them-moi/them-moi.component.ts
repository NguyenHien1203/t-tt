import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { QuanLyHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/quan-ly-ho-so-ca-nhan.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth.services';
import { DanhMucHoSoCaNhanService } from 'src/app/demo/service/ho-so-cong-viec/danh-muc-ho-so-ca-nhan.service';
import { TreeNode } from 'src/app/models/ho-so-cong-viec/danh-muc-ho-so-ca-nhan';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
    providers: [MessageService],
})
export class ThemMoiComponent {
    constructor(
        private formBuilder: FormBuilder,
        private service: QuanLyHoSoCaNhanService,
        private danhMucHoSoCaNhanService: DanhMucHoSoCaNhanService,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) {}
    items: any[] = [
        { label: 'Hồ sơ công việc' },
        { label: 'Quản lý hồ sơ công việc cá nhân' },
        { label: 'Thêm mới' },
    ];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    loading: boolean = true;
    hienThiChonVanBan: boolean = false;
    hienThiChonCongViec: boolean = false;
    hienThiChonPhieuTrinh: boolean = false;
    selectedFiles: any[] = [];
    selectedNodes: TreeNode = null;
    lstDmHoSo: TreeNode[] = [];
    lstLoaiHoSo: any[] = [];
    lstVanBanLienQuan: any[] = [];
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
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        danhMucHoSoId: [0, [Validators.required]],
        loaiHoSoId: [, [Validators.required]],
        maHoSo: ['', [Validators.required]],
        tieuDe: ['', [Validators.required]],
        ngayNhap: [new Date(), []],
        thoiHanBaoQuan: ['', [Validators.required]],
        ngayBatDau: [new Date(), [Validators.required]],
        ngayKetThuc: ['', [Validators.required]],
        soKyHieu: ['', [Validators.required]],
        nguoiLap: ['', []],
        dacDiem: ['', []],
        trangThai: ['', []],
        ghiChu: ['', []],
        tongSoVanBan: ['', [Validators.required]],
        TongSoTrang: ['', [Validators.required]],
        lstFile: [[], [Validators.required]],
    });

    ngOnInit() {
        this.loading = false;
        this.LoadDanhMuc();
    }

    public LoadDanhMuc() {
        this.danhMucHoSoCaNhanService
            .getDanhSachDanhMucHoSoCaNhan(this.idUser)
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

        this.formThemMoi.patchValue({
            nguoiLap: this.userFullName,
        });
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            event.target.value = '';
            let urlSave = '/HoSoCongViec/QuanLyHoSoCaNhan/UpLoadFile';
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
        let urlDownLoad = '/HoSoCongViec/QuanLyHoSoCaNhan/UpLoadFile';
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

    public ThemMoi() {
        this.submitted = true;

        if (this.formThemMoi.valid) {
            let itemData = this.formThemMoi.value;
            itemData.danhMucHoSoId = this.selectedNodes.data;
            this.service.themMoiHoSoCaNhan(itemData).subscribe(
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
                        });
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
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
        this.router.navigate(['/ho-so-cong-viec/quan-ly-ho-so-ca-nhan']);
    }

    public ChonPhieuTrinh(): void{

    }
    
    public ChonVanBan(): void{

    }
    
    public ChonCongViec(): void{

    }
}
