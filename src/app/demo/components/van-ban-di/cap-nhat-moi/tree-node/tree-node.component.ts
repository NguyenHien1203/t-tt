import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  template: `
    <li>
      <span>
        <input type="checkbox" [id]="node.id" [checked]="node.checked">|---{{ node.tenDonVi }}
      </span>
      <ul *ngIf="node.children && node.children.length > 0">
        <app-tree-node *ngFor="let child of node.children" [node]="child"></app-tree-node>
      </ul>
    </li>
  `,
  styles: [],
})
export class TreeNodeComponent {
  @Input() node: any;
}
