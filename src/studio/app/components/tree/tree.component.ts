import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface TreeItem {
  id: string;
  label: string;
}

@Component({
  selector: 'studio-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
}) export class TreeComponent {

  private _expanded = {};

  @Input() items: Array<TreeItem>;
  @Input() itemIconClassGenerator: Function = function (item: TreeItem) { return ''; };
  @Input() enableSelection:boolean = false;
  @Input() showIcons: boolean = true;

  @Output() itemExpanded = new EventEmitter();
  @Output() itemClicked = new EventEmitter();
  @Output() itemOptionsClicked = new EventEmitter();

  isExpanded(item: TreeItem): boolean {
    return !!(this._expanded[item.id]);
  }

  toggle(item: TreeItem) {
    this._expanded[item.id] = !(!!this._expanded[item.id]);
    this.onItemExpanded(item);
  }

  onItemExpanded(item) {
    this.itemExpanded.emit(item);
  }

  onItemClicked(item) {
    this.itemClicked.emit(item);
  }

  onItemOptionsClicked(event, element, item) {
    this.itemOptionsClicked.emit(item);
  }

}
