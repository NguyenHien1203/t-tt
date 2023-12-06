import { DanhMucHoSoCoQuanService } from './../../../../service/ho-so-cong-viec/danh-muc-ho-so-co-quan.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';

@Component({
    selector: 'app-them-moi',
    templateUrl: './them-moi.component.html',
    styleUrls: ['./them-moi.component.scss'],
})
export class ThemMoiComponent {
    @Input() id: string = '1';
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private service: DanhMucHoSoCoQuanService,
        private messageService: MessageService,
        private authService: AuthService
    ) {}

    selectedNodes: any = null;
    loading: boolean = true;
    submitted: boolean = false;
    lstHoSoParent: any[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    public formThemMoi = this.formBuilder.group({
        id: [0, []],
        maHoSo: ['', []],
        tenHoSo: ['', []],
        parentId: [0, []],
        luuTru: [false, []],
        ghiChu: ['', []],
        created: [new Date(), []],
        donViId: [this.idDonViLamViec, []],
        createdBy: [this.idUser, []],
    });

    ngOnInit() {
        this.loading = false;
        this.service
            .getDanhSachDanhMucHoSoCoQuan(this.idDonViLamViec)
            .then((data) => (this.lstHoSoParent = data));
    }

    public Thoat(): void {
        this.formThemMoi.reset();
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
    }

    public ThemMoi() {
        this.submitted = true;

        if (this.formThemMoi.valid) {
            let itemData = this.formThemMoi.value;
            itemData.id = 0;
            itemData.parentId = this.selectedNodes != null ? this.selectedNodes.data : 0;
            console.log(itemData)
            // this.service.themMoiDanhMucHoSoCoQuan(itemData).subscribe(
            //     (data) => {
            //         if (data.isError) {
            //             this.messageService.add({
            //                 severity: 'error',
            //                 summary: 'Error',
            //                 detail: data.title,
            //             });
            //         } else {
            //             this.messageService.add({
            //                 severity: 'success',
            //                 summary: 'Success',
            //                 detail: data.title,
            //             });
            //             this.Thoat();
            //         }
            //     },
            //     (error: any) => {
            //         this.messageService.add({
            //             severity: 'error',
            //             summary: 'Error',
            //             detail: 'Có lỗi xảy ra',
            //         });
            //         return throwError(() => error);
            //     }
            // );
        }
    }
}
