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
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: QuanLyChuyenMucCauHoiService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private authService: AuthService
    ) {}
    submitted: boolean = false;
    checked: boolean = true;
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    quanLyChuyenMucCauHoi: any = {};
    public formCapNhat = this.fb.group({
        id: [0, []],
        tenDanhMucCauHoi: ['', [Validators.required]],
        donViId: [0, []],
        hienThi: [false, []],
        thuTu: [0, []],
        lastModifiedBy: [Number(this.idUser), []],
        lastModified: [new Date(), []],
    });

    public async BindDataDialog() {
        const data = await this.service.getChuyenMucCauHoiById(this.id);
        this.formCapNhat.patchValue({
          id : data.id,
          tenDanhMucCauHoi : data.tenDanhMucCauHoi,
          donViId : data.donViId,
          hienThi : data.hienThi,
          thuTu : data.thuTu
        })
    }

    public Thoat(): void {
        this.submitted = false;
        this.formCapNhat.reset();
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public CapNhat(): void {
        this.submitted = true;
        if (this.formCapNhat.valid) {
            this.quanLyChuyenMucCauHoi = this.formCapNhat.value;
            this.service.capNhatChuyenMucCauHoi(this.quanLyChuyenMucCauHoi).subscribe(
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
