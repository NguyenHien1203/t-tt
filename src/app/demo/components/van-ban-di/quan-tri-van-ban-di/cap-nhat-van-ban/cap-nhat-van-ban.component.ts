import { filter, map, throwError } from 'rxjs';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Message, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriVanBanDiService } from 'src/app/demo/service/van-ban-di/quan-tri-van-ban-di/quan-tri-van-ban-di.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-cap-nhat-van-ban',
    templateUrl: './cap-nhat-van-ban.component.html',
    styleUrls: ['./cap-nhat-van-ban.component.scss'],
})
export class CapNhatVanBanComponent implements OnInit {
    @Input() show: boolean = false;
    @Output() close = new EventEmitter<boolean>();
    @Input() idVb: string = '';

    lstLoaiVanBan: any[] = [];
    lstSoVanBan: any[] = [];
    lstLanhDao: any[] = [];
    lstPBSoanThao: any[] = [];
    lstMucDo: any[] = [
        { text: 'VB thường', value: 1 },
        { text: 'VB khẩn, hỏa tốc', value: 2 },
        { text: 'VB mật', value: 3 },
        { text: 'VB tuyệt mật', value: 4 },
        { text: 'VB tối mật', value: 5 },
    ];

    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    userNameAd: string = this.authService.GetmUserInfo().userName ?? '0';
    msgs: Message[] = [];

    selectedFiles: any[] = [];

    formVanBan = this.formBuilder.group({
        id: [0, []],
        soVanBanId: ['', [Validators.required]],
        loaiVanBanId: ['', [Validators.required]],
        soHienTai: ['', [Validators.required]],
        soDi: ['', [Validators.required]],
        soKiHieu: ['', [Validators.required]],
        soBanPhatHanh: ['', []],
        ngayBanHanh: [new Date(), [Validators.required]],
        ngayNhanVanBan: [new Date(), [Validators.required]],
        phongBanSoanThaoId: ['', [Validators.required]],
        lanhDaoKyId: ['', [Validators.required]],
        trichYeu: ['', [Validators.required]],
        noiNhanKhac: ['', []],
        mucDoVanBanId: [this.lstMucDo[0].value, []],
        donViId: ['', []],
        chkVanBanLienThong: [false, []],
        chkVanBanHeThong: [false, []],
        chkVanBanNoiBo: [false, []],
        fileUpLoad: ['', []],
    });

    file: File | null = null;
    chkLienThong: boolean = false;
    chkHeThong: boolean = false;
    chkNoiBo: boolean = false;
    oldSoDi: string = '0';
    oldSoVanBanId: string = '0';
    oldLoaiVanBanId: string = '';

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private quanTriVanBanDiService: QuanTriVanBanDiService,
        private formBuilder: FormBuilder,
        private uploadFileService: UploadFileService
    ) {}

    ngOnInit() {
        this.GetLoaiVanBan();
        this.GetSoVanBan();
        this.GetDSLanhDao();
        this.GetDSPhongBanSoanThao();
    }

    // Danh sách loại văn bản
    GetLoaiVanBan() {
        this.quanTriVanBanDiService
            .getLoaiVanBan(this.idDonViLamViec)
            .subscribe(
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

    // Danh sách sổ văn bản
    GetSoVanBan() {
        this.quanTriVanBanDiService.getSoVanBan(this.idDonViLamViec).subscribe(
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

    // Danh sách lãnh đạo ký
    GetDSLanhDao() {
        this.quanTriVanBanDiService
            .getDanhSachLanhDaoKy(this.idDonViLamViec)
            .subscribe(
                (data) => {
                    if (data.isError) {
                        this.msgs = [];
                        this.msgs.push({
                            severity: 'error',
                            detail: 'Không tìm thấy dữ liệu',
                        });
                    } else {
                        this.lstLanhDao = data;
                        console.log(this.lstLanhDao);
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
    }

    // Danh sách phòng ban soạn thảo
    GetDSPhongBanSoanThao() {
        this.quanTriVanBanDiService
            .getDanhSachPBSoanThao(this.idDonViLamViec, this.userNameAd)
            .subscribe(
                (data) => {
                    if (data.isError) {
                        this.msgs = [];
                        this.msgs.push({
                            severity: 'error',
                            detail: 'Không tìm thấy dữ liệu',
                        });
                    } else {
                        this.lstPBSoanThao = data;
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
    }

    //
    onFileSelected(event: any) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            let urlSave = '/VanBanDi/QuanTriVanBanDi/UploadFile';
            this.uploadFileService.uploadFiles(FileInput, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Tải file thất bại.',
                            life: 3000,
                        });
                    else {
                        this.file = FileInput;
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Tải file thành công.',
                            life: 3000,
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
                        detail: 'Lỗi: ' + error,
                        life: 3000,
                    });
                    return throwError(() => error);
                },
            });
        }
    }

    DownloadFile(filePath: string, fileName: string) {
        let url = '/VanBanDi/QuanTriVanBanDi/DownloadFile';
        this.uploadFileService.downloadFile(filePath, fileName, url).subscribe(
            (data) => {
                const blob = new Blob([data], {
                    type: 'application/octet-stream',
                });
                saveAs(blob, fileName);
                this.messageService.add({
                    severity: 'success',
                    detail: 'Tải tệp thành công.',
                    life: 3000,
                });
            },
            (error) => {
                if (error.status === 404) {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Không tìm thấy file.',
                        life: 3000,
                    });
                } else {
                    this.msgs = [];
                    this.msgs.push({
                        severity: 'error',
                        detail: 'Không tìm thấy dữ liệu',
                    });
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

    TatPopup() {
        this.show = false;
        this.close.emit(this.show);
    }

    public async GetVanBanById() {
        try {
            const data = await this.quanTriVanBanDiService.getVanBanDiCapNhat(
                this.idVb
            );
            console.log('data: ', data);

            let fileLoad = data.lstFiles;
            fileLoad.forEach(function (val, key) {
                val.isNew = false;
                val.isDelete = false;
            });
            this.selectedFiles = data.lstFiles;
            let itemData = data.dataVanBanDi;
            this.oldSoDi = itemData.soDiDen;
            this.oldSoVanBanId = itemData.soVanBanId;
            this.oldLoaiVanBanId = itemData.loaiVanBanId;
            this.chkHeThong = itemData.chkVanBanHeThong == 2 ? true : false;
            this.chkLienThong = itemData.chkVanBanLienThong == 3 ? true : false;
            this.chkNoiBo = itemData.chkVanBanNoiBo == 1 ? true : false;
            this.formVanBan.patchValue({
                id: itemData.id,
                soVanBanId: itemData.soVBId,
                loaiVanBanId: itemData.loaiVanBanId,
                soHienTai: itemData.soDiDen,
                soDi: itemData.soDiDenCustom,
                soKiHieu: itemData.soKiHieu,
                soBanPhatHanh: itemData.soBanPhatHanh,
                ngayBanHanh: new Date(itemData.ngayBanHanh),
                ngayNhanVanBan: new Date(itemData.ngayNhanGui),
                phongBanSoanThaoId:
                    this.lstPBSoanThao
                        .filter(
                            (pdId) =>
                                pdId.value.split('%')[0] ==
                                itemData.phongBanSoanThaoId
                        )
                        .map((pdId) => pdId.value)
                        .join(', ') ?? '',
                lanhDaoKyId:
                    this.lstLanhDao
                        .filter(
                            (ldId) =>
                                ldId.value.split('%')[0] == itemData.lanhDaoKyId
                        )
                        .map((ldId) => ldId.value)
                        .join(', ') ?? '',
                trichYeu: itemData.trichYeu,
                donViId: itemData.donViId,
                noiNhanKhac: itemData.noiNhanKhac,
                mucDoVanBanId: itemData.mucDoKhan,
                chkVanBanLienThong: this.chkLienThong,
                chkVanBanHeThong: this.chkHeThong,
                chkVanBanNoiBo: this.chkNoiBo,
                fileUpLoad: fileLoad,
            });
            console.log('form', this.formVanBan.value);
        } catch (e) {
            this.messageService.add({
                severity: 'error',
                detail: 'Lỗi' + e + '!',
                life: 3000,
            });
        }
    }
}
