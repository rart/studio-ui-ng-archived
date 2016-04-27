import {Component, Input} from 'angular2/core';

export interface TreeItem {
    id: string;
    label: string;
}

@Component({
    selector: 'tree',
    directives: [TreeCmp],
    template: `
        <ul>
            <li [class.is-leaf]="item.isLeaf()" *ngFor="#item of items">
                <label *ngIf="enableSelection" class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator"></span></label>
                <button [disabled]="item.isLeaf()" (click)="toggle(item)" class="item-toggler">
                    <i [class.ion-ios-minus-empty]="item.isLeaf()"
                       [class.ion-ios-arrow-right]="!item.isLeaf() && !isExpanded(item)"
                       [class.ion-ios-arrow-down]="!item.isLeaf() && isExpanded(item)"></i>
                </button>
                <a class="highlight-target" [title]="item.label" (click)="itemClicked(item)">
                    <i class="ion-ios-paper-outline"></i>
                    <span>{{item.label}}</span>
                    <button #btn class="item-menu-trigger" (click)="showItemOptions($event, btn, item)"><i class="ion-ios-more"></i></button>
                </a>
                <tree *ngIf="isExpanded(item)" [items]="item.children" [enableSelection]="enableSelection"></tree>
            </li>
        </ul>`
}) export class TreeCmp {

    private _expanded = {};

    @Input() items: Array<TreeItem>;
    @Input() enableSelection:boolean = false;

    isExpanded(item: TreeItem) {
        return !!(this._expanded[item.id]);
    }

    toggle(item: TreeItem) {
        this._expanded[item.id] = !(!!this._expanded[item.id]);
    }

    itemClicked(item) {

    }

    showItemOptions(event, element, item) {
        console.log(event, element, item)
    }

}


