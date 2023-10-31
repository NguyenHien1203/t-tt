import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-them-dv-thuc-hien',
  templateUrl: './them-dv-thuc-hien.component.html',
})
export class ThemDvThucHienComponent {
  @Input() hienThi: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
}
