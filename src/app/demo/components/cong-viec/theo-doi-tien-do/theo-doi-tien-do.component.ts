import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theo-doi-tien-do',
  templateUrl: './theo-doi-tien-do.component.html',
  styleUrls: ['./theo-doi-tien-do.component.scss']
})
export class TheoDoiTienDoComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Theo dõi tiến độ' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
