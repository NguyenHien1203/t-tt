import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetPhieuTrinhService } from 'src/app/demo/service/ho-so-cong-viec/duyet-phieu-trinh.service';
import { FileModel } from 'src/app/models/file-upload-model';
import { modelOptions } from 'src/app/models/option-model';

@Component({
    selector: 'app-xu-ly',
    templateUrl: './xu-ly.component.html',
    styleUrls: ['./xu-ly.component.scss'],
})
export class XuLyComponent {
    @Input() show: boolean = false;
    @Input() id: string = '1';
    @Output() tatPopup = new EventEmitter<boolean>();

    constructor(
        private fb: FormBuilder,
        private service: DuyetPhieuTrinhService,
        private messageService: MessageService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    phieuTrinh: any;
    yKienLanhDao: string = '';
    lstFileDuThao: FileModel[] = [];
    lstFileLienQuan: FileModel[] = [];
    lstlanhDaoKy: modelOptions[] = [];
    lstLanhDaoDuyet: modelOptions[] = [];
    lstVanBanLienQuan: modelOptions[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idPhongBan: string = this.authService.GetmUserInfo()?.phongBanId ?? '0';
    userFullName: string = this.authService.GetmUserInfo()?.fullName ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    submitted: boolean = false;

    public async BindDialogData() {
        this.phieuTrinh = await this.service.getPhieuTrinhById(this.id);
    }

    public Thoat(): void {
        this.submitted = false;
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }

    public XuLy(loai: string) {
        let itemData = {
            loai: loai,
            yKienLanhDao: this.yKienLanhDao,
        };
        this.service.xuLyPhieuTrinh(itemData).subscribe((data) => {});
    }
}
