import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-them-dv-thuc-hien',
  templateUrl: './them-dv-thuc-hien.component.html',
})
export class ThemDvThucHienComponent {
  @Input() hienThidvth: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  public formThemMoidvth = this.formBuilder.group({
    id: ["", []],
   
  });

  public SubmitDvth(){

  }

  public ThoatDvThucHien(): void {
    this.hienThidvth = false;
    this.tatPopup.emit(this.hienThidvth);
  }

}
