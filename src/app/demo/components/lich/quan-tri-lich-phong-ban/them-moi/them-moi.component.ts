import { map } from 'rxjs';
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePointApi } from '@fullcalendar/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanTriLichPhongBanService } from 'src/app/demo/service/lich/quan-tri-lich-phong-ban.service';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() show: boolean = false;
    @Input() tuNgay: Date;
    @Input() denNgay: Date;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: QuanTriLichPhongBanService,
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
    lstThu: SelectItem[] = [];
    lstPhut: SelectItem[] = [];
    lstThoiGian: SelectItem[] = [
        { label: 'Chọn thời gian', value: '0' },
        { label: 'Buổi sáng', value: '1' },
        { label: 'Buổi chiều', value: '2' },
    ];
    lstLichDaThem: any[] = [];
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    submitted: boolean = false;
    formThemMoi = this.fb.group({
        id: [0, []],
        listThu: [, []],
        thoiGian: ['0', []],
        gio: [null, []],
        phut: [null, []],
        diaDiem: ['', []],
        lanhDaoChuTri: ['', []],
        lanhDaoVanPhong: ['', []],
        chuyenVienPhoiHop: ['', []],
        noiDung: ['', []],
        donViId: [0, []],
        phongBanId: [0, []],
    });

    public async LoadThu() {
        this.lstThu = [];
        const data = await this.service.getDanhSachLichThuDaThem(
            this.formatDateToDDMMYY(this.tuNgay),
            this.formatDateToDDMMYY(this.denNgay)
        );

        this.lstLichDaThem = data;
        let idx = 0;
        const dayOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        const dayOfWeekFull = [
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
            'Chủ nhật',
        ];
        for (
            let date = new Date(this.tuNgay);
            date <= new Date(this.denNgay);
            date.setDate(date.getDate() + 1)
        ) {
            if (!this.lstLichDaThem.includes(this.formatDateToDDMMYY(date))) {
                // kiểm tra ngày đã thêm có trong danh sách chưa
                this.lstThu.push({
                    label:
                        dayOfWeek[idx] +
                        ' (' +
                        this.formatDateToDDMMYY(date) +
                        ') ',
                    value: new Date(date),
                    title: dayOfWeekFull[idx],
                });
            }

            idx++;
        }
    }

    formatDateToDDMMYY(date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();
        return day + '/' + month + '/' + year;
    }
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
            for (let i = index; i <= number; i++) {
                this.lstGio.push({ label: ('0' + i).slice(-2), value: i });
            }
        }
    }

    public ThemMoi(): void {
        this.submitted = true;
        if (this.formThemMoi.valid) {
            const itemData = this.formThemMoi.value;

            const lstTmp = this.lstThu.map((data) => {
                return { ...data, value: this.formatDateToDDMMYY(data.value) };
            });
            let listThuSelected = (itemData.listThu as any[]).map(
                (value) =>
                    lstTmp.filter(
                        (data) => data.value == this.formatDateToDDMMYY(value)
                    )[0]?.title +
                    '_' +
                    this.formatDateToDDMMYY(value)
            );
            const lichPhongBan = {
                id: 0,
                listThu: listThuSelected,
                thoiGian: itemData.thoiGian,
                gio: itemData.gio,
                phut: itemData.phut,
                diaDiem: itemData.diaDiem,
                lanhDaoChuTri: itemData.lanhDaoChuTri,
                lanhDaoVanPhong: itemData.lanhDaoVanPhong,
                chuyenVienPhoiHop: itemData.chuyenVienPhoiHop,
                noiDung: itemData.noiDung,
                donViId: this.idDonViLamViec,
                phongBanId: this.idPhongBan,
            };

            this.service.themMoiQuanTriLichPhongBan(lichPhongBan).subscribe(
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
