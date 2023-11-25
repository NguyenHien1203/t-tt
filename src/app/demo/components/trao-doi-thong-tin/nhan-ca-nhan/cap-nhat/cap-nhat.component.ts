import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { NhanCaNhanService } from 'src/app/demo/service/trao-doi-thong-tin/nhan-ca-nhan.service';

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
        private service: NhanCaNhanService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    submitted: boolean = false;
    checked: boolean = false;
    nhanCaNhan: any = {};
    public checkedValue: boolean = false;
    public formCapNhat = this.fb.group({
        id: [0, []],
        tenHienThi: ['', [Validators.required]],
        hienThi: [false, []],
        ghiChu: ['', []],
    });

    public async BindDataDialog() {
        try {
            const data = await this.service.getNhanCaNhanById(this.id);
            this.formCapNhat.setValue(data);
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Có lỗi xảy ra: ' + error,
            });
        }
    }

    public Thoat(): void {
        this.checkedValue = false;
        this.formCapNhat.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public CapNhat(): void {
        this.submitted = true;
        if (this.formCapNhat.valid) {
            this.nhanCaNhan = this.formCapNhat.value;
            this.service.capNhatNhanCaNhan(this.nhanCaNhan).subscribe(
                (data) => {
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

    public CheckedHt() {
        this.checkedValue = !this.checkedValue;
    }
}
