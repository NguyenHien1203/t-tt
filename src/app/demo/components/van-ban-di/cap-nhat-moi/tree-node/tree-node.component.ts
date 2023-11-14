import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tree-node',
    template: `
        <li>
            <span
                (click)="toggleNode()"
                [class]="node.children.length > 0 ? iconClass : 'mg-l'"
            >
                <input
                    type="checkbox"
                    [id]="node.id"
                    [checked]="node.checked"
                    (click)="handleCheckboxClick($event)"
                />
                <span class="icon">{{ node.tenDonVi }}</span>
            </span>
            <ul *ngIf="node.expanded">
                <app-tree-node
                    *ngFor="let child of node.children"
                    [node]="child"
                    (expand)="expandNode($event)"
                    (collapse)="collapseNode($event)"
                ></app-tree-node>
            </ul>
        </li>
    `,
    styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent {
    @Input() node: any;
    @Output() expand: EventEmitter<any> = new EventEmitter();
    @Output() collapse: EventEmitter<any> = new EventEmitter();
    @Output() isCheckAll: EventEmitter<any> = new EventEmitter();

    iconClass = 'pi pi-plus';

    handleCheckboxClick(event: Event): void {
        event.stopPropagation(); // Ngăn chặn sự kiện lan ra các phần tử cha
    }

    toggleNode(): void {
        this.node.expanded = !this.node.expanded;
        if (this.node.expanded) {
            this.expand.emit(this.node);
        } else {
            this.collapse.emit(this.node);
        }
        this.iconClass = this.node.expanded ? 'pi pi-minus' : 'pi pi-plus';
    }

    expandNode(childNode: any): void {
        this.expand.emit(childNode);
    }

    collapseNode(childNode: any): void {
        this.collapse.emit(childNode);
    }
}
