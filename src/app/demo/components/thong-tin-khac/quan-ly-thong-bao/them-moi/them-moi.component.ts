import {
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';
import { QuanLyThongBaoService } from 'src/app/demo/service/thong-tin-khac/quan-ly-thong-bao.service';
import { throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { saveAs } from 'file-saver';
import { MyUploadAdapter } from '../../../trao-doi-thong-tin/soan-thu/soan-thu.component';
import { format } from 'date-fns';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @ViewChild('myEditor') myEditor: any;
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: QuanLyThongBaoService,
        private messageService: MessageService,
        private authService: AuthService,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef,
        @Inject(DOCUMENT) private document: Document
    ) {}
    file: File | null = null; // Variable to store file
    checkHienThi: boolean = false;
    Editor = ClassicEditor;

    quanLyThongBao: any = {};
    submitted: boolean = false;
    formThemMoi = this.fb.group({
        id: [0, []],
        tieuDe: ['', [Validators.required]],
        ngayBatDau: [, []],
        ngayKetThuc: [, []],
        donViId: [0, []],
        noiDung: ['', []],
        hienThi: [, []],
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
            this.quanLyThongBao = this.formThemMoi.value;
            this.quanLyThongBao.id = 0; //tránh trường hợp quản lý thông báo bị null
            this.quanLyThongBao.ngayBatDau = format(this.quanLyThongBao.ngayBatDau, "dd/MM/yyyy");
            this.quanLyThongBao.ngayKetThuc = format(this.quanLyThongBao.ngayKetThuc, "dd/MM/yyyy");
            this.quanLyThongBao.donViId = this.authService.GetDonViLamViec();
            this.quanLyThongBao.userId =
                this.authService.GetmUserInfo()?.userId;
            this.quanLyThongBao.hienThi = this.checkHienThi ? 1 : 0;
            this.quanLyThongBao.noiDung =
                this.myEditor.editorInstance.getData();
            this.service.themMoiQuanLyThongBao(this.quanLyThongBao).subscribe(
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

    onReady($event) {
        let urlSave = '/ThongTinKhac/QuanLyThongBao/UpLoadImageCkeditor';
        $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader, urlSave);
        };
    }

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

    public CheckedHt(): void {
        this.checkHienThi = !this.checkHienThi;
    }

    public XoaFile(): void {
        this.file = null;
    }
}
