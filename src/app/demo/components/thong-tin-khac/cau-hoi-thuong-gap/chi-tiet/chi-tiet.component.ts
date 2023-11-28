import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CauHoiThuongGapService } from 'src/app/demo/service/thong-tin-khac/cau-hoi-thuong-gap.service';

@Component({
    selector: 'app-chi-tiet',
    templateUrl: './chi-tiet.component.html',
    styleUrls: ['./chi-tiet.component.scss'],
})
export class ChiTietComponent {
    @Input() show: boolean = false;
    @Output() tatPopup = new EventEmitter<boolean>();
    @Input() id: string = '1';

    constructor(
        private service: CauHoiThuongGapService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}

    cauHoiThuongGap: any;
    dataFile: any = {};

    public async BindDataDialog() {
        this.cauHoiThuongGap = await this.service.getCauHoiThuongGap(this.id);
    }

    public Thoat(): void {
        this.show = false;
        this.tatPopup.emit(this.show);
        this.cd.detectChanges();
    }
}
