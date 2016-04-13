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
                    <i [class.ion-ios-close-empty]="item.isLeaf()"
                       [class.ion-ios-arrow-right]="!item.isLeaf() && !isExpanded(item)"
                       [class.ion-ios-arrow-down]="!item.isLeaf() && isExpanded(item)"></i>
                </button>
                <div class="highlight-target">
                    <i class="ion-ios-paper-outline"></i>
                    <a [title]="item.label">{{item.label}}</a>
                    <button class="item-menu-trigger"><i class="ion-ios-more"></i></button>
                </div>
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

}
