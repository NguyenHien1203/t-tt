import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LienKetService } from 'src/app/demo/service/lien-ket/lien-ket.service';
import { LienKet } from 'src/app/models/danh-muc/lien-ket/lien-ket';
import { ResponeMessage } from 'src/app/models/he-thong/ResponeMessage';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})

export class ThemMoiComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder
    , private service: LienKetService
    , private messageService: MessageService) { };
    
  public lienKet: any = {};
  public checkedValue : boolean = false;
  submitted: boolean = false;
  public formThemMoi = this.fb.group({
    id: [0, []],
    tenLienKet: ["", [Validators.required]],
    ghiChu: ["", []],
    hienThi: [false, ''],
    thuTu: [0, []],
  });

  public Thoat(): void {
    this.checkedValue = false;
    this.formThemMoi.reset();
    this.submitted = false;
    this.hienThi = false;
    this.tatPopup.emit(this.hienThi);
  }

  public ThemMoi(): void {
    this.submitted = true;
    if (this.formThemMoi.valid) {
      this.lienKet = this.formThemMoi.value;
      this.lienKet.hienThi = this.checkedValue;
      this.service.themMoiLienKet(this.lienKet).subscribe(
        data => {
          let resData = data as ResponeMessage;
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
