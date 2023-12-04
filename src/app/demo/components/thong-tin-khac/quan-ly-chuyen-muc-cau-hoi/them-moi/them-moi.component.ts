import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyChuyenMucCauHoiService } from 'src/app/demo/service/thong-tin-khac/quan-ly-chuyen-muc-cau-hoi.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

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
        private service: QuanLyChuyenMucCauHoiService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    quanLyChuyenMucCauHoi: any = {};
    submitted: boolean = false;
    formThemMoi = this.fb.group({
        id: [0, []],
        tenDanhMucCauHoi: ['', [Validators.required]],
        donViId: [0, []],
        hienThi: [false, []],
        thuTu: [0, []],
        createdBy: [Number(this.idUser), []],
        created: [new Date(), []],
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
            this.quanLyChuyenMucCauHoi = this.formThemMoi.value;
            this.quanLyChuyenMucCauHoi.donViId =
                this.authService.GetDonViLamViec();
            console.log(this.quanLyChuyenMucCauHoi);
            this.service
                .themMoiChuyenMucCauHoi(this.quanLyChuyenMucCauHoi)
                .subscribe(
                    (data) => {
                        let resData = data as ResponeMessage;
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
