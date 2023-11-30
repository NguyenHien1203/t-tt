import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { aW } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyCauHoiThươngGapService } from 'src/app/demo/service/thong-tin-khac/quan-ly-cau-hoi-thương-gap.service';
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
        private service: QuanLyCauHoiThươngGapService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private authService: AuthService
    ) {}
    submitted: boolean = false;
    checked: boolean = true;
    lstChuyenMuc: any[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    quanLyChuyenMucCauHoi: any = {};
    public formCapNhat = this.fb.group({
        id: [0, []],
        chuyenMucId: ['', [Validators.required]],
        donViId: [0, []],
        hienThi: [false, []],
        thuTu: [0, []],
        cauHoi: ['', []],
        traLoi: ['', []],
        tieuDe: ['', []],
        lastModifiedBy: [Number(this.idUser), []],
        lastModified: [new Date(), []],
    });

    public async BindDataDialog() {
        this.lstChuyenMuc = await this.service.getChuyenMucCauHoi(this.idDonViLamViec);
        const data = await this.service.getCauHoiThuongGapById(this.id);
        this.formCapNhat.patchValue({
            id: data.id,
            chuyenMucId: data.chuyenMucId,
            donViId: data.donViId,
            hienThi: data.hienThi,
            thuTu: data.thuTu,
            cauHoi: data.cauHoi,
            traLoi: data.traLoi,
            tieuDe: data.tieuDe,
        });
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
            this.service
                .capNhatCauHoiThuongGap(this.quanLyChuyenMucCauHoi)
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
