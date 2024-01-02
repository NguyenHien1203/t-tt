import { saveAs } from 'file-saver';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { ThayDoiThongTinService } from 'src/app/demo/service/he-thong/thay-doi-thong-tin.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { environment } from 'src/environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-thay-doi-thong-tin',
    templateUrl: './thay-doi-thong-tin.component.html',
    styleUrls: ['./thay-doi-thong-tin.component.scss'],
    providers: [MessageService],
})
export class ThayDoiThongTinComponent {
    constructor(
        private formBuilder: FormBuilder,
        private service: ThayDoiThongTinService,
        private fileService: UploadFileService,
        private messageService: MessageService,
        private authService: AuthService,
        private sanitizer: DomSanitizer
    ) {}

    items: any[] = [{ label: 'Hệ thống' }, { label: 'Thông tin người dùng' }];
    home: any = { icon: 'pi pi-home', routerLink: '/' };
    lstGioiTinh: any[] = [
        { name: 'Nam', key: 0 },
        { name: 'Nữ', key: 1 },
    ];
    anhKyNhayShow: any;
    anhConDauShow: any;
    loading: boolean = true;
    isAnhKyNhayLoading: boolean = false;
    isAnhConDauLoading: boolean = false;
    anhKyNhay: any;
    anhConDau: any;
    submitted: boolean = false;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    phongBanName: string = this.authService.GetmUserInfo()?.tenDonVi ?? '0';
    public formThongTin = this.formBuilder.group({
        id: [0, []],
        hoVaTen: ['', [Validators.required]],
        sdtNhaRieng: ['', []],
        sdtCoQuan: ['', []],
        sdtDiDong: ['', []],
        email: ['', []],
        gioiTinh: [0, []],
    });

    ngOnInit() {
        this.loading = false;
        this.LoadThongTinNguoiDung();
    }

    public async LoadThongTinNguoiDung() {
        const data = await this.service.getThongTinNguoiDung(this.idUser);
        this.formThongTin.patchValue({
            id: data.id,
            hoVaTen: data.hoVaTen,
            sdtNhaRieng: data.sdtNhaRieng,
            sdtCoQuan: data.sdtCoQuan,
            sdtDiDong: data.sdtDiDong,
            email: data.email,
            gioiTinh: data.gioiTinh,
        });
        if (data?.anhKyNhay != null) {
            const dataAnhKyNhay = {
                filePath: data.anhKyNhay,
            };
            this.anhKyNhay = dataAnhKyNhay;
            this.GetImage(1);
        }
        if (data?.anhConDau != null) {
            const dataAnhConDau = {
                filePath: data.anhConDau,
            };
            this.anhConDau = dataAnhConDau;
            this.GetImage(2);
        }
    }

    public onFileSelected(event: any, loai: number) {
        const FileInput: File = event.target.files[0];

        if (FileInput) {
            event.target.value = '';
            let urlSave = '/HeThong/ThayDoiThongTin/UpLoadFile';
            this.fileService.uploadFiles(FileInput, urlSave).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
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

                        if (loai == 1) {
                            this.anhKyNhay = fileReturn;
                        }

                        if (loai == 2) {
                            this.anhConDau = fileReturn;
                        }
                        this.GetImage(loai);
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
    public GetImage(loai) {
        const filePath =
            loai == 1 ? this.anhKyNhay?.filePath : this.anhConDau?.filePath;
        // //Gọi API để lấy hình ảnh
        if (filePath != null) {
            this.service.getAnh(filePath).subscribe(
                (data) => {
                    this.createImageFromBlob(data, loai);
                    if (loai == 1) {
                        this.isAnhKyNhayLoading = false;
                    }
                    if (loai == 2) {
                        this.isAnhConDauLoading = false;
                    }
                },
                (error) => {
                    if (loai == 1) {
                        this.isAnhKyNhayLoading = false;
                    }
                    if (loai == 2) {
                        this.isAnhConDauLoading = false;
                    }
                    console.log(error);
                }
            );
        }
    }

    createImageFromBlob(image: Blob, loai: number) {
        let reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                if (loai == 1) {
                    this.anhKyNhayShow = reader.result;
                }
                if (loai == 2) {
                    this.anhConDauShow = reader.result;
                }
            },
            false
        );

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    public XoaFile(loai: number): void {
        console.log(loai);
        if (loai == 1) {
            this.anhKyNhay = null;
        }

        if (loai == 2) {
            this.anhConDau = null;
        }
    }

    public ThayDoi() {
        this.submitted = true;

        if (this.formThongTin.valid) {
            let itemData = this.formThongTin.value;
            let thongTinUser = {
                id: itemData.id,
                hoVaTen: itemData.hoVaTen,
                sdtNhaRieng: itemData.sdtNhaRieng,
                sdtCoQuan: itemData.sdtCoQuan,
                sdtDiDong: itemData.sdtDiDong,
                email: itemData.email,
                gioiTinh: itemData.gioiTinh,
                anhConDau: this.anhConDau?.filePath,
                anhKyNhay: this.anhKyNhay?.filePath,
            };

            this.service.thayDoiThongTin(thongTinUser).subscribe(
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
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
    }

    public Thoat(itemHt: any, loai: string): void {}
}
