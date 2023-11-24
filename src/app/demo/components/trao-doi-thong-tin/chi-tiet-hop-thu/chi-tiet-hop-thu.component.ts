import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chi-tiet-hop-thu',
  templateUrl: './chi-tiet-hop-thu.component.html',
  styleUrls: ['./chi-tiet-hop-thu.component.scss']
})
export class ChiTietHopThuComponent {
  @Input() show: boolean = false;
  @Output() tatPopup = new EventEmitter<boolean>();
}
