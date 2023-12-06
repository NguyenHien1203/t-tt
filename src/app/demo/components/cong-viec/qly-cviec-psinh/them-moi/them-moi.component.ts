import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-them-moi',
  templateUrl: './them-moi.component.html',
  styleUrls: ['./them-moi.component.scss']
})
export class ThemMoiComponent implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Thêm mới công việc' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
  }

}
