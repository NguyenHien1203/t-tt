import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { an } from '@fullcalendar/core/internal-common';
import { format } from 'date-fns';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LichCaNhanService } from 'src/app/demo/service/lich/lich-ca-nhan.service';

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
        private service: LichCaNhanService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {
        this.lstGio.push({ label: 'Chọn giờ', value: null });
        this.lstPhut.push({ label: 'Chọn phút', value: null });
        for (let i = 0; i < 24; i++) {
            this.lstGio.push({ label: ('0' + i).slice(-2), value: i });
        }
        for (let i = 0; i < 60; i += 5) {
            this.lstPhut.push({ label: ('0' + i).slice(-2), value: i });
        }
    }

    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    lstGio: SelectItem[] = [];
    lstPhut: SelectItem[] = [];
    submitted: boolean = false;
    formThemMoi = this.fb.group({
        id: [0, []],
        lichHop: ['', [Validators.required]],
        noiDung: ['', []],
        ngayHopBatDau: [null, []],
        ngayHopKetThuc: [null, []],
        diaDiem: [, []],
        gioBatDau: [, []],
        phutBatDau: [, []],
        gioKetThuc: [, []],
        phutKetThuc: [, []],
        ghiChu: ['', []],
    });

    public Thoat(): void {
        this.submitted = false;
        this.formThemMoi.reset();
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public ThemMoi(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            const itemData = this.formThemMoi.value;
            let lichCaNhan = {
                id: 0,
                lichHop: itemData.lichHop,
                noiDung: itemData.noiDung,
                ghiChu: itemData.ghiChu,
                diaChi: itemData.diaDiem,
                thoiGianBatDauHop: format(
                    new Date(itemData.ngayHopBatDau),
                    'dd/MM/yyyy'
                ),
                thoiGianKetThucHop: format(
                    new Date(itemData.ngayHopKetThuc),
                    'dd/MM/yyyy'
                ),
                UserId: Number(this.idUser),
                gioBatDau: itemData.gioBatDau,
                phutBatDau: itemData.phutBatDau,
                gioKetThuc: itemData.gioKetThuc,
                phutKetThuc: itemData.phutKetThuc,
            };
            this.service.themMoiLichCaNhan(lichCaNhan).subscribe(
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
