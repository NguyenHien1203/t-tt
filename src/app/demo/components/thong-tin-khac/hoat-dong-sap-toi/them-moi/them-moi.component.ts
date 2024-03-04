import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { HoatDongSapToiService } from 'src/app/demo/service/thong-tin-khac/hoat-dong-sap-toi/hoat-dong-sap-toi.service';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent implements OnInit {
    @Input() show: boolean = false;
    @Output() close = new EventEmitter<boolean>();

    userId: string = this.authService.GetmUserInfo()?.userId ?? '0';
    todayDate: Date = new Date();
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        noiDung: ['', []],
        ngayDienRa: [Date, []],
        donViId: [0, []],
        created: [new Date(), []],
        createdBy: [Number(this.userId), []],
        lastModified: [new Date(), []],
        lastModifiedBy: [0, []],
    });
    valueForm: any;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private hoatDongSapToiService: HoatDongSapToiService
    ) {}

    ngOnInit(): void {}

    ThemMoi() {
        this.submitted = true;
        this.valueForm = this.formThemMoi.value;
        this.valueForm.donViId = this.authService.GetDonViLamViec();
        this.valueForm.create = this.authService.GetmUserInfo().userId;
        this.valueForm.lastModifiedBy = this.authService.GetmUserInfo().userId;

        if (this.formThemMoi.valid) {
            this.submitted = true;
            this.hoatDongSapToiService
                .themMoi(this.formThemMoi.value)
                .subscribe((data) => {
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
                    }
                });
            this.TatPopup();
            this.formThemMoi.reset();
        }
    }

    TatPopup() {
        this.submitted = false;
        this.show = false;
        this.close.emit(this.show);
        this.formThemMoi.reset();
    }
}
