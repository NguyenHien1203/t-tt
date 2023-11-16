import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.scss'],
})
export class TreeNodeComponent {
    @Input() node: any;
    @Output() expand: EventEmitter<any> = new EventEmitter();
    @Output() collapse: EventEmitter<any> = new EventEmitter();
    @Output() isCheckAll: EventEmitter<any> = new EventEmitter();
    @Output() checkNode = new EventEmitter<any>(); // Output để emit sự kiện lên component cha

    iconClass = 'pi pi-plus';

    handleCheckboxClick(event: Event): void { // tương tự như node-cha
        this.node.checked = !this.node.checked;
        this.checkNode.emit({
            id: this.node.id,
            checked: this.node.checked,
        });
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
