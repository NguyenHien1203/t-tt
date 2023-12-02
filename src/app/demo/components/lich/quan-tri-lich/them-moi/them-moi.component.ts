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
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: QuanTriLichService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
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
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    submitted: boolean = false;
    formThemMoi = this.fb.group({
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
        donViId : [this.idDonViLamViec, []],
        userId : [this.idUser, []],
    });

    public Thoat(): void {
        this.submitted = false;
        this.formThemMoi.reset();
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public ChangeThoiGian() {
        this.lstGio = [];
        let value = this.formThemMoi.value.thoiGian;
        if (value != null && value != '0') {
            this.lstGio.push({ label: 'Chọn giờ', value: null });
           let number = value == '1' ? 12 : value == '2' ? 23 : 0;
           let index = value == '1' ? 0 : value == '2' ? 12 : 0;
            for (let i = index; i <= number; i ++) {
                this.lstGio.push({ label: ('0' + i).slice(-2), value: i });
            }
        }
    }

    public ThemMoi(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            const quanTriLich = this.formThemMoi.value;
            quanTriLich.id = 0;
            this.service.themMoiQuanTriLich(quanTriLich).subscribe(
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
