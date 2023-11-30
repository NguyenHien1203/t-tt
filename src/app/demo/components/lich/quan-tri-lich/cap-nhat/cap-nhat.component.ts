import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriLichService } from 'src/app/demo/service/lich/quan-tri-lich.service';

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
        private service: QuanTriLichService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private authService: AuthService
    ) {
        this.lstPhut.push({ label: 'Chọn phút', value: null });
        for (let i = 0; i < 60; i += 5) {
            this.lstPhut.push({ label: ('0' + i).slice(-2), value: i });
        }
    }
    lstGio: SelectItem[] = [];
    lstPhut: SelectItem[] = [];
    lstThoiGian: SelectItem[] = [
        { label: 'Chọn thời gian', value: '0' },
        { label: 'Buổi sáng', value: '1' },
        { label: 'Buổi chiều', value: '2' },
    ];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    submitted: boolean = false;
    public formCapNhat = this.fb.group({
        id: [0, []],
        ngayTao: [new Date(), [Validators.required]],
        thoiGian: ['0', []],
        gio: [null, []],
        phut: [null, []],
        diaDiem: ['', []],
        lanhDaoChuTri: ['', []],
        lanhDaoVanPhong: ['', []],
        donViChuanBi: ['', []],
        noiDung: ['', []],
    });

    public async BindDataDialog() {
        try {
            const data = await this.service.getQuanTriLichById(this.id);
            data.ngayTao = new Date(data.ngayTao);
            this.formCapNhat.setValue(data);
        } catch (error) {
            console.log(error);
        }

        this.ChangeThoiGian();
    }

    public ChangeThoiGian() {
        this.lstGio = [];
        let value = this.formCapNhat.value.thoiGian;
        if (value != null) {
            this.lstGio.push({ label: 'Chọn giờ', value: null });
           let number = value == '1' ? 12 : value == '2' ? 23 : 0;
           let index = value == '1' ? 0 : value == '2' ? 12 : 0;
            for (let i = index; i <= number; i ++) {
                this.lstGio.push({ label: ('0' + i).slice(-2), value: i });
            }
        }
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
            let lichCaNhan = this.formCapNhat.value;
            this.service.capNhatQuanTriLich(lichCaNhan).subscribe(
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
}
