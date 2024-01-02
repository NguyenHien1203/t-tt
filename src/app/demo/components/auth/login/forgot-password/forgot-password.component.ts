import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyDatLaiMatKhauService } from 'src/app/demo/service/he-thong/quan-ly-dat-lai-mat-khau.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
    @Input() show: boolean = false;
    @Input() id: string = '1';
    @Input() userName: string = 'abc';
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: QuanLyDatLaiMatKhauService,
        private messageService: MessageService
    ) {}

    submitted: boolean = false;
    showLyDo: boolean = false;
    isTonTai: boolean = false;
    public formXuLy = this.formBuilder.group({
        userName: ['', [Validators.required]],
        hoVaTen: ['', [Validators.required]],
        soDienThoai: ['', []],
    });

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.formXuLy.reset();
        this.tatPopup.emit(this.show);
    }

    public Gui() {
        this.submitted = true;

        if (this.formXuLy.valid) {
            let itemData = this.formXuLy.value;
            this.service.guiYeuCauDatLai(itemData).subscribe(
                (data) => {
                    if (data.isError) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.title,
                        });
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: data.title,
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
