import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { ThemMoiPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/them-moi-phieu-trinh.service';
import { UploadFileService } from 'src/app/demo/service/upload-file.service';

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
        private service: ThemMoiPhieuTrinhService,
        private messageService: MessageService,
        private authService: AuthService,
        private fileService: UploadFileService,
        private cd: ChangeDetectorRef
    ) {}

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
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public ThemMoi(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            this.quanLyThongBao = this.formThemMoi.value;
            this.service.themMoiPhieuTrinh(this.quanLyThongBao).subscribe(
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
