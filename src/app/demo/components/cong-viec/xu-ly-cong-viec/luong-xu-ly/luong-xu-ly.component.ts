import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
    selector: 'app-luong-xu-ly',
    templateUrl: './luong-xu-ly.component.html',
    styleUrls: ['./luong-xu-ly.component.scss'],
})
export class LuongXuLyComponent {
    constructor(private router: Router) {}

    items = [
        { label: 'Công việc' },
        { label: 'Xử lý công việc' },
        { label: 'Luồng xử lý' },
    ];
    home = { icon: 'pi pi-home', routerLink: '/' };

    data: TreeNode[] = [
      {
          label: 'F.C Barcelona',
          expanded: true,
          children: [
              {
                  label: 'Argentina',
                  expanded: true,
                  children: [
                      {
                          label: 'Argentina'
                      },
                      {
                          label: 'France'
                      }
                  ]
              },
              {
                  label: 'France',
                  expanded: true,
                  children: [
                      {
                          label: 'France'
                      },
                      {
                          label: 'Morocco'
                      }
                  ]
              }
          ]
      }
  ];

    public QuayLai() {
        this.router.navigate(['./cong-viec/xu-ly-cong-viec']);
    }
}
