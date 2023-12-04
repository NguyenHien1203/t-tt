import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TiepNhanVanBanService } from 'src/app/demo/service/van-ban-den/tiep-nhan-van-ban/tiep-nhan-van-ban.service';

@Component({
  selector: 'app-tu-choi',
  templateUrl: './tu-choi.component.html',
  styleUrls: ['./tu-choi.component.scss']
})
export class TuChoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';

  submitted_VB: boolean = false;

  formTT_VB_fomat: any = [];

  constructor(
    private service: TiepNhanVanBanService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  public formTuChoi = this.formBuilder.group({
    vanBanId: ["", []],
    lyDoTuChoi: ["", [Validators.required]],
    idDonViLamViec: ["", []],
    donViId: ["", []],
    userId: ["", []],
  });


  public Thoat(): void {
    this.submitted_VB = false;
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  /**
   * TuChoi
   */
  public TuChoi() {
    this.submitted_VB = true;

    if (this.formTuChoi.valid) {
      this.formTuChoi.value.idDonViLamViec = this.authService.GetDonViLamViec();
      this.formTuChoi.value.donViId = this.authService.GetmUserInfo().donViId?.toString();
      this.formTuChoi.value.userId = this.authService.GetmUserInfo().userId?.toString();
      this.formTuChoi.value.vanBanId = this.id;

      this.formTT_VB_fomat = this.formTuChoi.value;

      this.service.TuChoiVanBan(this.formTT_VB_fomat).subscribe(data => {
        if (data.isError) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: data.title });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data.title });
          this.Thoat();
        }
      }, (error) => {
        console.log('Error', error);
      })
    }
  }

}
