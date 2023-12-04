import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { QuanLyCauHoiThươngGapService } from 'src/app/demo/service/thong-tin-khac/quan-ly-cau-hoi-thương-gap.service';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

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
      private service: QuanLyCauHoiThươngGapService,
      private messageService: MessageService,
      private authService: AuthService,
      private cd: ChangeDetectorRef
  ) {
    this.service.getChuyenMucCauHoi(this.idDonViLamViec).then(data => {
        this.lstChuyenMuc = data;
    })
  }
  idDonViLamViec : string = this.authService.GetDonViLamViec() ?? "0";
  idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
  quanLyCauHoiThuongGap: any = {};
  lstChuyenMuc : any[] = [];
  submitted: boolean = false;
  formThemMoi = this.fb.group({
      id: [0, []],
      chuyenMucId: ['', [Validators.required]],
      donViId: [0, []],
      hienThi: [false, []],
      thuTu: [0, []],
      cauHoi: ['', []],
      traLoi: ['', []],
      tieuDe: ['', []],
      createdBy: [Number(this.idUser), []],
      created: [new Date(), []],
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
          this.quanLyCauHoiThuongGap = this.formThemMoi.value;
          this.quanLyCauHoiThuongGap.donViId =
              this.authService.GetDonViLamViec();
          console.log(this.quanLyCauHoiThuongGap);
          this.service
              .themMoiCauHoiThuongGap(this.quanLyCauHoiThuongGap)
              .subscribe(
                  (data) => {
                      let resData = data as ResponeMessage;
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
