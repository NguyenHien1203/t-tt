import { saveAs } from 'file-saver';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { throwError, map } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { modelOptions } from 'src/app/models/option-model';
import { FileModel } from 'src/app/models/file-upload-model';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { AuthService } from 'src/app/common/auth.services';
import { MessageService } from 'primeng/api';
import { ThemMoiPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/them-moi-phieu-trinh.service';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() show: boolean = false;
    @Input() id: string = '1';
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: ThemMoiPhieuTrinhService,
        private messageService: MessageService,
        private authService: AuthService,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef
    ) {}

    lstFileDuThao: FileModel[] = [];
    lstFileLienQuan: FileModel[] = [];
    lstlanhDaoKy: modelOptions[] = [];
    lstLanhDaoDuyet: modelOptions[] = [];
    lstVanBanLienQuan: modelOptions[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    submitted: boolean = false;
    formCapNhat = this.fb.group({
        tenPhieuTrinh: ['', [Validators.required]],
        kinhGuiId: [0, [Validators.required]],
        id: [0, []],
        nguoiTrinhId: [0, []],
        tenNguoiTrinh: ['', []],
        nguoiKyId: [0, [Validators.required]],
        nguoiDuyetId: [0, []],
        donViId: [0, []],
        phongBanId: [0, []],
        vanBanLienQuanId: [0, []],
        trichYeuVanBanDen: ['', [Validators.required]],
        vanDeTrinh: ['', [Validators.required]],
        trichYeuDuThaoVanBan: ['', [Validators.required]],
    });

    public async BindDialogData() {
        await this.LoadDanhMuc();

        const objData = await this.service.getPhieuTrinhById(this.id);
        let data = objData?.objPhieuTrinh;
        this.lstFileDuThao = objData?.listFileDuThao.map((data) => {
            return { ...data, isNew: false, isDelete: false };
        });
        this.lstFileLienQuan = objData?.listFileLienQuan.map((data) => {
            return { ...data, isNew: false, isDelete: false };
        });
        this.formCapNhat.patchValue({
            id: data.id,
            tenPhieuTrinh: data.tenPhieuTrinh,
            kinhGuiId: data.kinhGuiId,
            nguoiTrinhId: data.nguoiTrinhId,
            nguoiDuyetId: data.nguoiDuyetId,
            nguoiKyId: data.nguoiKyId,
            vanBanLienQuanId: data.vanBanLienQuanId,
            trichYeuDuThaoVanBan: data.trichYeuDuThaoVanBan,
            trichYeuVanBanDen: data.trichYeuVanBanDen,
            tenNguoiTrinh: data.tenNguoiTrinh,
            vanDeTrinh: data.vanDeTrinh,
        });
    }

    public async LoadDanhMuc() {
        const lanhDaoKyData = await this.service.getDanhSachLanhDaoKy(
            this.idDonViLamViec
        );
        this.lstlanhDaoKy = lanhDaoKyData;

        const lanhDaoDuyetData = await this.service.getDanhSachLanhDaoDuyet(
            this.idDonViLamViec
        );
        this.lstLanhDaoDuyet = lanhDaoDuyetData;

        const vanBanLienQuanData = await this.service.getDanhSachVanBanLienQuan(
            this.idDonViLamViec
        );
        this.lstVanBanLienQuan = vanBanLienQuanData;
    }

    public Thoat(): void {
        this.submitted = false;
        this.formCapNhat.reset();
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public onFileSelected(event: any, loai: string) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            event.target.value = '';
            let urlSave = '/HoSoCongViec/PhieuTrinh/UpLoadFile';
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
                        if (loai === '1') this.lstFileDuThao.push(fileReturn);
                        if (loai === '2') this.lstFileLienQuan.push(fileReturn);
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
        let urlDownLoad = '/HoSoCongViec/QuanLyHoSoCoQuan/UpLoadFile';
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

    public XoaFile(filePath: string, loai: string): void {
        if (loai === '1') {
            this.lstFileDuThao.forEach((obj, index) => {
                if (obj.filePath === filePath) {
                    obj.isDelete = true;
                    obj.isNew = false;
                }
            });
        }
        if (loai === '2') {
            this.lstFileLienQuan.forEach((obj, index) => {
                if (obj.filePath === filePath) {
                    obj.isDelete = true;
                    obj.isNew = false;
                }
            });
        }
    }

    public CapNhat(): void {
        this.submitted = true;
        if (this.formCapNhat.valid) {
            let itemData = this.formCapNhat.value;
            let phieuTrinh = {
                tenPhieuTrinh: itemData.tenPhieuTrinh,
                kinhGuiId: itemData.kinhGuiId,
                id: itemData.id,
                nguoiTrinhId: this.idUser,
                nguoiKyId: itemData.nguoiKyId,
                nguoiDuyetId: itemData.nguoiDuyetId,
                vanBanLienQuanId: itemData.vanBanLienQuanId,
                trichYeuVanBanDen: itemData.trichYeuDuThaoVanBan,
                vanDeTrinh: itemData.vanDeTrinh,
                trichYeuDuThaoVanBan: itemData.trichYeuDuThaoVanBan,
                lstFileDuThao: this.lstFileDuThao,
                lstFileLienQuan: this.lstFileLienQuan,
            };
            this.service.capNhatPhieuTrinh(phieuTrinh).subscribe(
                (data) => {
                    console.log('data', data);
                    let resData = data;
                    if (resData.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: resData.title,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: resData.title,
                        });
                        this.Thoat();
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
    }
}
