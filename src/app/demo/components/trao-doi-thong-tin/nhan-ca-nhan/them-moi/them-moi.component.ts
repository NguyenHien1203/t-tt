import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { NhanCaNhanService } from 'src/app/demo/service/trao-doi-thong-tin/nhan-ca-nhan.service';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder
    , private service: NhanCaNhanService
    , private messageService: MessageService,
    private authService : AuthService) { };
    
  public nhanCaNhan: any = {};
  public checkedValue : boolean = false;
  submitted: boolean = false;
  idUser : string = this.authService.GetmUserInfo()?.userId ?? "0;"
  public formThemMoi = this.fb.group({
    id: [0, []],
    tenHienThi: ["", [Validators.required]],
    ghiChu: ["", []],
    hienThi: [false, ''],
  });

  public Thoat(): void {
    this.checkedValue = false;
    this.formThemMoi.reset();
    this.submitted = false;
    this.show = false;
    this.tatPopup.emit(this.show);
  }

  public ThemMoi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.nhanCaNhan = this.formThemMoi.value;
      this.nhanCaNhan.userId = Number(this.idUser);
      this.nhanCaNhan.hienThi = this.checkedValue;
      console.log(this.nhanCaNhan)
      this.service.themMoiNhanCaNhan(this.nhanCaNhan).subscribe(
        data => {
          let resData = data;
          if (resData.isError) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: resData.title });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: resData.title });
            this.Thoat();
          }
        },
        error => {
          console.log('Error', error);
        })
    }
  }

  public CheckedHt(){
    this.checkedValue = !this.checkedValue;
  }
}
