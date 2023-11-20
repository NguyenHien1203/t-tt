import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-chi-tiet-van-ban',
  templateUrl: './chi-tiet-van-ban.component.html',
  styleUrls: ['./chi-tiet-van-ban.component.scss']
})
export class ChiTietVanBanComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  ngOnInit() {

  }


  tatPopup() {
    this.show = false;
    this.close.emit(this.show);
  }
}

