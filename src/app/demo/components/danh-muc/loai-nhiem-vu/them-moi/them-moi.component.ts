import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent {
  @Input() hienThi: boolean = false;
}
