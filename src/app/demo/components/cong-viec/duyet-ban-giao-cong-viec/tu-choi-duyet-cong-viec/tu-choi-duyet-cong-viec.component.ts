import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { DuyetBanGiaoCongViecService } from 'src/app/demo/service/cong-viec/duyet-ban-giao-cong-viec/duyet-ban-giao-cong-viec.service';

@Component({
    selector: 'app-tu-choi-duyet-cong-viec',
    templateUrl: './tu-choi-duyet-cong-viec.component.html',
    styleUrls: ['./tu-choi-duyet-cong-viec.component.scss'],
})
export class TuChoiDuyetCongViecComponent {
    @Input() hienThi: boolean = false;
    @Output() close = new EventEmitter<boolean>();
    @Input() id: string = '';

    constructor(
        private service: DuyetBanGiaoCongViecService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    submitted = false;

    public formTuChoi = this.formBuilder.group({
      id: [0, []],
      noiDung: ["", []],
    });

    public closePopup() {
      this.submitted = false;
      this.hienThi = false;
      this.close.emit(this.hienThi);
      this.formTuChoi.reset();
    }
}
