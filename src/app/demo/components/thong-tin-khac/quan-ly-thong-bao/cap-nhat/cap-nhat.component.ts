import { formatDate } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { throwError } from 'rxjs';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
    // providers: [IDbAsyncQueryProvider]
})
export class CapNhatComponent {
    @ViewChild('myEditor') myEditor: any;
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: QuanLyThongBaoService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {}
    trustUrl: any;
    dataFile: any;
    file: File | null = null; // Variable to store file
    public Editor = ClassicEditor;
    submitted: boolean = false;
    checked: boolean = true;
    relativePath: string = '';
    quanLyThongBao: any = {};
    public checkedValue: boolean = false;
    public formCapNhat = this.fb.group({
        id: [0, []],
        tieuDe: ['', [Validators.required]],
        ngayBatDau: [, []],
        ngayKetThuc: [, []],
        donViId: [0, []],
        noiDung: ['', []],
        hienThi: [, []],
        created: [0, []],
        trangThai: [0, []],
        fileName: [0, []],
        filePath: [0, []],
    });

    public BindDataDialog(): void {
        //hiển thị file lên mẫu cập nhật
        this.service.getFile(this.id).subscribe((data) => {
            this.dataFile = data;
        });
        this.service.getQuanLyThongBaoId(this.id).subscribe((data) => {
            if (data.fileName !== '') {
                this.file = new File([], data.fileName, { type: 'text/plain' });
            }
            data.ngayBatDau = new Date(data.ngayBatDau);
            data.ngayKetThuc = new Date(data.ngayKetThuc);
            data.hienThi = this.checkedValue = data.hienThi == 1 ? true : false;
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
        if (file) {
            event.target.value = '';
            let urlUpload = '/ThongTinKhac/QuanLyThongBao/UploadFile';
            this.fileService.uploadFile(file, urlUpload).subscribe({
                next: (data) => {
                    if (data.isError)
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    else {
                        this.dataFile = file; //lấy dữ liệu file hiện tại chuẩn bị cho việc tải xuống
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

    //hàm cấu hình tool bar của CKEDITOR
    public getToolBar(): any {
        const toolbar: any = {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontfamily',
                'fontsize',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'subscript',
                'superscript',
                'code',
                '|',
                'link',
                'uploadImage',
                'blockQuote',
                'codeBlock',
                '|',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent',
            ],
            shouldNotGroupWhenFull: true,
        };
        return toolbar;
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
            this.quanLyThongBao = this.formCapNhat.value;
            this.quanLyThongBao.hienThi = this.checkedValue ? 1 : 0;
            this.service.capNhatQuanLyThongBao(this.quanLyThongBao).subscribe(
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

    //hàm lấy giá trị checkbox
    public CheckedHt() {
        this.checkedValue = !this.checkedValue;
    }

    //hàm xóa tệp
    public XoaFile(): void {
        this.file = null;
    }
}
