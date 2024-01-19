import { DonVi } from './../../../../../models/danh-muc/don-vi';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuanLyDatLaiMatKhauService } from 'src/app/demo/service/he-thong/quan-ly-dat-lai-mat-khau.service';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-xu-ly',
    templateUrl: './xu-ly.component.html',
    styleUrls: ['./xu-ly.component.scss'],
})
export class XuLyComponent {
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
        id: ['0', []],
        userName: ['', []],
        xacNhan: [0, []],
        lyDoTuChoi: ['', []],
    });
    lstXuLy: any[] = [
        { name: 'Đồng ý', key: 0 },
        { name: 'Từ chối', key: 1 },
    ];

    public async BindDialogData() {
        try {
            const data = await this.service.kiemTraTaiKhoan(this.userName);
            console.log(data);
            this.isTonTai = data != null;

            this.formXuLy.patchValue({
                xacNhan: this.isTonTai ? 0 : 1,
            });

            this.HandleRadio();
        } catch (error) {
            console.log(error);
        }
    }

    public HandleRadio() {
        let timeout = 500;
        clearTimeout(timeout);
        setTimeout(() => {
            if (this.formXuLy.value.xacNhan == 1) this.showLyDo = true;
            if (this.formXuLy.value.xacNhan == 0) this.showLyDo = false;
        }, timeout);
    }

    public Thoat(): void {
        this.show = false;
        this.formXuLy.reset();
        this.tatPopup.emit(this.show);
    }

    public Gui() {
        this.submitted = true;

        if (this.formXuLy.valid) {
            let itemData = this.formXuLy.value;
            itemData.id = this.id;
            itemData.userName = this.userName;
            this.service.xuLyYeuCau(itemData).subscribe(
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
                    }
                },
                (error) => {
                    console.log('Error', error);
                }
            );
        }
    }
}
