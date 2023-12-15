import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { CapNhatMoiService } from 'src/app/demo/service/van-ban-di/cap-nhat-moi.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: CapNhatMoiService,
        private uploadfileService: UploadFileService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}
    loading: boolean = true;
    selectedFiles: any[] = [];
    submitted: boolean = false;
    dataFile: any;
    file_fomat: any = [];
    vanBanDi: any = [];
    file: File | null = null;
    chkLienThong: boolean = false;
    chkHeThong: boolean = false;
    chkNoiBo: boolean = false;
    lstSoVanBan: any[] = [];
    lstLoaiVanBan: any[] = [];
    lstPhongBan: any[] = [];
    lstLanhDaoKy: any[] = [];
    lstMucDoVanBan: any[] = [
        { text: 'VB thường', value: 1 },
        { text: 'VB khẩn, hỏa tốc', value: 2 },
        { text: 'VB mật', value: 3 },
        { text: 'VB tuyệt mật', value: 4 },
        { text: 'VB tối mật', value: 5 },
    ];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    public formThongTinVanBan = this.formBuilder.group({
        id: [0, []],
        soVanBanId: ['', [Validators.required]],
        loaiVanBanId: ['', [Validators.required]],
        soHienTai: ['', [Validators.required]],
        soDi: ['', [Validators.required]],
        soKiHieu: ['', [Validators.required]],
        soBanBanHanh: ['', []],
        ngayBanHanh: [new Date(), [Validators.required]],
        ngayNhanVanBan: [new Date(), [Validators.required]],
        phongBanSoanThaoId: ['', [Validators.required]],
        lanhDaoKyId: ['', [Validators.required]],
        trichYeu: ['', [Validators.required]],
        noiNhanKhac: ['', []],
        mucDoVanBanId: [this.lstMucDoVanBan[0].value, []],
        donViId: ['', []],
        chkVanBanLienThong: [false, []],
        chkVanBanHeThong: [false, []],
        chkVanBanNoiBo: [false, []],
        fileUpLoad: ['', []],
    });
    oldSoDi: string = '0';
    oldSoVanBanId: string = '0';
    oldLoaiVanBanId: string = '';

    ngOnInit() {
        this.loading = false;
        this.LoadSoVanBan();
        this.LoadPhongBanSoanThao();
        this.LoadLanhDaoKy();
    }

    public async BindDialogData() {
        try {
            const data = await this.service.getVanBanById(this.id);
            let fileLoad = data.lstFile;
            fileLoad.forEach(function (val, key) {
                val.isNew = false;
                val.isDelete = false;
            });
            this.selectedFiles = data.lstFile;
            let itemData = data.objVanBan;
            this.oldSoDi = itemData.soDi;
            this.oldSoVanBanId = itemData.soVanBanId;
            this.oldLoaiVanBanId = itemData.loaiVanBanId;
            this.chkHeThong = itemData.chkVanBanHeThong == 2 ? true : false;
            this.chkLienThong = itemData.chkVanBanLienThong == 3 ? true : false;
            this.chkNoiBo = itemData.chkVanBanNoiBo == 1 ? true : false;
            this.formThongTinVanBan.patchValue({
                id: itemData.id,
                soVanBanId: itemData.soVanBanId,
                loaiVanBanId: itemData.loaiVanBanId,
                soHienTai: itemData.soHienTai,
                soDi: itemData.soDi,
                soKiHieu: itemData.soKiHieu,
                soBanBanHanh: itemData.soBanBanHanh,
                ngayBanHanh: new Date(itemData.ngayBanHanh),
                ngayNhanVanBan: new Date(itemData.ngayNhanVanBan),
                phongBanSoanThaoId:
                    this.lstPhongBan
                        .filter(
                            (pbid) =>
                                pbid.value.split('%')[0] ==
                                itemData.phongBanSoanThaoId
                        )
                        .map((pbid) => pbid.value)
                        .join(', ') ?? '',
                lanhDaoKyId:
                    this.lstLanhDaoKy
                        .filter(
                            (ldk) =>
                                ldk.value.split('%')[0] == itemData.lanhDaoKyId
                        )
                        .map((ldk) => ldk.value)
                        .join(', ') ?? '',
                trichYeu: itemData.trichYeu,
                noiNhanKhac: itemData.noiNhanKhac,
                mucDoVanBanId: itemData.mucDoVanBanId,
                donViId: itemData.donViId,
                chkVanBanLienThong: this.chkLienThong,
                chkVanBanHeThong: this.chkHeThong,
                chkVanBanNoiBo: this.chkNoiBo,
                fileUpLoad: fileLoad,
            });

            const soKiHieuData = await this.service.getSoKiHieu(
                this.formThongTinVanBan.value.soVanBanId,
                this.formThongTinVanBan.value.loaiVanBanId,
                this.formThongTinVanBan.value.soHienTai
            );
            this.formThongTinVanBan.patchValue({
                soKiHieu: soKiHieuData,
            });
            console.log("form", this.formThongTinVanBan.value);
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra' + error,
            });
        }
    }

    public LoadLanhDaoKy() {
        this.service.getDanhSachLanhDaoKy(this.idDonViLamViec).then((data) => {
            this.lstLanhDaoKy = data;
        });
    }

    public LoadPhongBanSoanThao() {
        this.service
            .getDanhSachPhongBan(
                this.idDonViLamViec,
                this.authService.GetmUserInfo()?.userName ?? ''
            )
            .then((data) => {
                this.lstPhongBan = data;
            });
    }

    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public Thoat(): void {
        this.formThongTinVanBan.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public async ChangeSoVanBan(event) {
        try {
            if (event != null) {
                const dataSoHienTai = await this.service.getSoHienTai(
                    event?.toString(),
                    this.formThongTinVanBan.value.ngayBanHanh,
                    this.oldSoVanBanId?.toString(),
                    this.formThongTinVanBan.value.soDi,
                    this.oldSoDi?.toString()
                );

                this.formThongTinVanBan.patchValue({
                    soHienTai: dataSoHienTai,
                });

                const dataSoKiHieu = await this.service.getSoKiHieu(
                    event,
                    this.formThongTinVanBan.value.loaiVanBanId,
                    this.formThongTinVanBan.value.soHienTai
                );

                this.formThongTinVanBan.patchValue({
                    soKiHieu: dataSoKiHieu,
                });
                this.lstLoaiVanBan = await this.service.changeSoVanBan(
                    event,
                    this.idDonViLamViec
                );
            }
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra' + error,
            });
        }
    }

    public async ChangeLoaiVanBan(event) {
        try {
            if (
                this.formThongTinVanBan.value.soVanBanId != null &&
                this.formThongTinVanBan.value.soHienTai
            ) {
                const soKiHieu = await this.service.getSoKiHieu(
                    this.formThongTinVanBan.value.soVanBanId,
                    event,
                    this.formThongTinVanBan.value.soHienTai
                );

                this.formThongTinVanBan.patchValue({
                    soKiHieu: soKiHieu,
                });
            }
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra',
            });
        }
    }

    public onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            this.file = FileInput;
            let urlSave = '/VanBanDi/CapNhatMoi/UpLoadFile';
            this.uploadfileService.uploadFiles(this.file, urlSave).subscribe({
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
                            fileName: data.objData.fileName,
                            filePath: data.objData.filePath,
                            isNew: true,
                            isDelete: false,
                        };
                        this.selectedFiles.push(fileReturn);
                    }
                },
                error: (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra' + error,
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    public DownloadFile(filepath: string, filename: string) {
        let urlDownLoad = '/VanBanDi/CapNhatMoi/DownloadFile';
        this.uploadfileService
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

    public CheckVanBanLienThong(): void {
        this.chkLienThong = !this.chkLienThong;
    }

    public CheckVanBanTrongHeThong(): void {
        this.chkHeThong = !this.chkHeThong;
    }

    public CheckVanBanNoiBo(): void {
        this.chkNoiBo = !this.chkNoiBo;
    }

    public CapNhat() {
        this.submitted = true;

        if (this.formThongTinVanBan.valid) {
            this.formThongTinVanBan.value.donViId =
                this.authService.GetDonViLamViec();
            this.vanBanDi = this.formThongTinVanBan.value;
            this.vanBanDi.chkVanBanLienThong = this.chkLienThong ? 1 : 0;
            this.vanBanDi.chkVanBanHeThong = this.chkHeThong ? 1 : 0;
            this.vanBanDi.chkVanBanNoiBo = this.chkNoiBo ? 1 : 0;
            this.vanBanDi.fileUpLoad = JSON.stringify(this.selectedFiles);
            this.vanBanDi.SoVanBanIdCu = this.oldSoVanBanId?.toString();
            this.vanBanDi.SoDiCu = this.oldSoDi?.toString();

            this.service.capNhatVanBanDi(this.vanBanDi).subscribe(
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
                        this.Thoat();
                    }
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Có lỗi xảy ra',
                    });
                    return throwError(() => error);
                }
            );
        }
    }

    public NhapLai() {
        this.BindDialogData();
        this.submitted = false;
    }
}
