import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cap-nhat',
  templateUrl: './cap-nhat.component.html',
  styleUrls: ['./cap-nhat.component.scss']
})
export class CapNhatComponent  implements OnInit {
  items: any[] = [];
  home: any;
  loading: boolean = true;

  ngOnInit() {
    this.loading = false;
    this.items = [{ label: 'Công việc' }, { label: 'Cập nhật công việc' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
  }

}
