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
import { QuanLyCauHoiThươngGapService } from 'src/app/demo/service/thong-tin-khac/quan-ly-cau-hoi-thương-gap.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
    selector: 'app-tra-loi',
    templateUrl: './tra-loi.component.html',
    styleUrls: ['./tra-loi.component.scss'],
})
export class TraLoiComponent {
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
    cauTraLoi: string = '';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    quanLyChuyenMucCauHoi: any = {};

    public Thoat(): void {
        this.submitted = false;
        this.cauTraLoi = '';
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public TraLoi(): void {
        this.submitted = true;
        this.service.traLoiCauHoi(this.id, this.cauTraLoi, this.idUser).subscribe(
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
