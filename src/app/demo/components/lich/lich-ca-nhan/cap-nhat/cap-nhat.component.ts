import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { LichCaNhanService } from 'src/app/demo/service/lich/lich-ca-nhan.service';

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
        private service: LichCaNhanService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private authService: AuthService
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
    public formCapNhat = this.fb.group({
        id: [0, []],
        lichHop: ['', [Validators.required]],
        noiDung: ['', []],
        ngayHopBatDau: [new Date(), []],
        ngayHopKetThuc: [new Date(), []],
        diaDiem: [, []],
        gioBatDau: [0, []],
        phutBatDau: [0, []],
        gioKetThuc: [0, []],
        phutKetThuc: [0, []],
        ghiChu: ['', []],
    });

    public async BindDataDialog() {
        try {
            const data = await this.service.getLichCaNhanById(this.id);
            if (data != null) {
                this.formCapNhat.patchValue({
                    id: data.id,
                    lichHop: data.lichHop,
                    noiDung: data.noiDungHop,
                    ghiChu: data.ghiChu,
                    ngayHopBatDau: new Date(data.thoiGianBatDauHop),
                    ngayHopKetThuc: new Date(data.thoiGianKetThucHop),
                    diaDiem: data.diaChiHop,
                    gioBatDau: new Date(data.thoiGianBatDauHop).getHours(),
                    gioKetThuc: new Date(data.thoiGianKetThucHop).getHours(),
                    phutBatDau: new Date(data.thoiGianBatDauHop).getMinutes(),
                    phutKetThuc: new Date(data.thoiGianKetThucHop).getMinutes(),
                });
            }
        } catch (error) {
            console.log(error);
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
            const itemData = this.formCapNhat.value;
            let lichCaNhan = {
                id: itemData.id,
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
            this.service.capNhatLichCaNhan(lichCaNhan).subscribe(
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
