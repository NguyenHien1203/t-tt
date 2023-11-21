import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { TheoDoiVanBanDiService } from 'src/app/demo/service/van-ban-di/theo-doi-van-ban-di.service';

@Component({
  selector: 'app-gui-canh-bao',
  templateUrl: './gui-canh-bao.component.html',
  styleUrls: ['./gui-canh-bao.component.scss']
})
export class GuiCanhBaoComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
  @Input() id: string = '1';
  @Input() idDonVi: string = '1';

  constructor(
      private service: TheoDoiVanBanDiService,
      private messageService: MessageService,
      private authService: AuthService,
  ) {}

  loading: boolean = false;
  noiDungCanhBao: string = "";
  submitted: boolean = false;
  idDonViLamViec = this.authService.GetDonViLamViec() ?? '0';

  public ThoatBaoCao(): void {
      this.submitted = false;
      this.show = false;
      this.tatPopup.emit(this.show);
  }

  public GuiCanhBao(): void {
      this.submitted = true;
          this.service.guiCanhBao(this.id, this.idDonVi, this.noiDungCanhBao).subscribe(
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
                      this.ThoatBaoCao();
                  }
              },
              (error) => {
                  console.log('Error', error);
              }
          );
  }
}
