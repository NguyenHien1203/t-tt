import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { throwError } from 'rxjs';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import { saveAs } from 'file-saver';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyBangLuongService } from 'src/app/demo/service/thong-tin-khac/quan-ly-bang-luong.service';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: QuanLyBangLuongService,
        private messageService: MessageService,
        private authService: AuthService,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef
    ) {}

    file: File | null = null; // Variable to store file
    quanLyBangLuong: any = {};
    submitted: boolean = false;
    formThemMoi = this.fb.group({
        id: [0, []],
        tieuDe: ['', [Validators.required]],
        donViId: [0, []],
        noiDung: ['', []],
        ghiChu: [, []],
        fileName: ['', []],
        filePath: ['', []],
    });

    public Thoat(): void {
        this.submitted = false;
        this.formThemMoi.reset();
        this.show = false;
        this.file = null;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    onChange(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            let urlUpload = '/ThongTinKhac/QuanLyBangLuong/UploadFile';
            this.fileService.uploadFile(file, urlUpload).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    else {
                        this.file = file;
                        this.messageService.add({
                            severity: 'info',
                            summary: 'Info',
                            detail: data.title,
                        });
                        this.formThemMoi.patchValue({
                            fileName: data.objData.fileName,
                            filePath: data.objData.filePath,
                        });
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

    public downloadFile() {
        const blob = new Blob([this.file], {
            type: 'application/octet-stream',
        });

        // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
        saveAs(blob, this.file.name);
    }

    public ThemMoi(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            this.quanLyBangLuong = this.formThemMoi.value;
            this.quanLyBangLuong.donViId = this.authService.GetDonViLamViec();
            this.quanLyBangLuong.userId =
                this.authService.GetmUserInfo()?.userId;

            this.service.themMoiQuanLyBangLuong(this.quanLyBangLuong).subscribe(
                (data) => {
                    console.log('data', data);

                    let resData = data as ResponeMessage;
                    if (resData.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: resData.title,
                        });
                    } else {
                        this.XoaFile();
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

    public XoaFile(): void {
        this.file = null;
    }
}
