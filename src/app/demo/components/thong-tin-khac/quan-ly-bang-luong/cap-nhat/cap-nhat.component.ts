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
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyBangLuongService } from 'src/app/demo/service/thong-tin-khac/quan-ly-bang-luong.service';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: QuanLyBangLuongService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef
    ) {}
    dataFile: any;
    file: File | null = null; // Variable to store file
    submitted: boolean = false;
    quanLyBangLuong: any = {};
    public formCapNhat = this.fb.group({
        id: [0, []],
        tieuDe: ['', [Validators.required]],
        donViId: [0, []],
        noiDung: ['', []],
        ghiChu: [, []],
        fileName: ['', []],
        filePath: ['', []],
    });

    public BindDataDialog(): void {
        //hiển thị file lên mẫu cập nhật
        this.service.getFile(this.id).subscribe((data) => {
            this.dataFile = data;
        });
        this.service.getQuanLyBangLuongId(this.id).subscribe((data) => {
            if (data.fileName !== '') {
                this.file = new File([], data.fileName, { type: 'text/plain' });
            }
            data.fileName = '';
            data.filePath = '';
            this.formCapNhat.setValue(data);
        });
    }

    //tải xuống tệp
    public downloadFile() {
        const blob = new Blob([this.dataFile], {
            type: 'application/octet-stream',
        });

        // Sử dụng saveAs để tải tệp xuống với tên cụ thể.
        saveAs(blob, this.file.name);
    }

    //function upload file
    onChange(event: any) {
        const file: File = event.target.files[0];
        this.dataFile = file; //lấy dữ liệu file hiện tại chuẩn bị cho việc tải xuống
        if (file) {
            event.target.value = '';
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
                        this.formCapNhat.patchValue({
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

    public Thoat(): void {
        this.submitted = false;
        this.file = null;
        this.formCapNhat.reset();
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public CapNhat(): void {
        this.submitted = true;
        if (this.formCapNhat.valid) {
            this.quanLyBangLuong = this.formCapNhat.value;
            this.service.capNhatQuanLyBangLuong(this.quanLyBangLuong).subscribe(
                (data) => {
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

    //hàm xóa tệp
    public XoaFile(): void {
        this.file = null;
    }
}
