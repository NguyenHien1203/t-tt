import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';
@Component({
    selector: 'app-cap-nhat',
    templateUrl: './cap-nhat.component.html',
    styleUrls: ['./cap-nhat.component.scss'],
})
export class CapNhatComponent {
    @Input() hienThi: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: LienKetService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    submitted: boolean = false;
    checked: boolean = false;
    lienKet: any = {};
    public checkedValue: boolean = false;
    public formCapNhat = this.fb.group({
        id: [0, []],
        tenLienKet: ['', [Validators.required]],
        thuTu: [0, []],
        hienThi: [false, []],
        ghiChu: ['', []],
    });

    public async BindDataDialog() {
        const data = await this.service.getDmLienKetById(this.id);
        this.formCapNhat.setValue(data);
    }

    public Thoat(): void {
        this.checkedValue = false;
        this.formCapNhat.reset();
        this.submitted = false;
        this.hienThi = false;
        this.tatPopup.emit(this.hienThi);
    }

    public CapNhat(): void {
        this.submitted = true;
        if (this.formCapNhat.valid) {
            this.lienKet = this.formCapNhat.value;
            this.service.capNhatLienKet(this.lienKet).subscribe(
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

    public CheckedHt() {
        this.checkedValue = !this.checkedValue;
    }
}
