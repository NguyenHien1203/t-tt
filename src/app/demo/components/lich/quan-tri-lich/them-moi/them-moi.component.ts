import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriLichService } from 'src/app/demo/service/lich/quan-tri-lich.service';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
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
    }

    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
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
                thoiGianBatDauHop: new Date(itemData.ngayHopBatDau).toLocaleDateString(),
                thoiGianKetThucHop: new Date(itemData.ngayHopKetThuc).toLocaleDateString(),
                UserId: Number(this.idUser),
                gioBatDau: itemData.gioBatDau,
                phutBatDau: itemData.phutBatDau,
                gioKetThuc: itemData.gioKetThuc,
                phutKetThuc: itemData.phutKetThuc,
            };
            this.service.themMoiQuanTriLich(lichCaNhan).subscribe(
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
