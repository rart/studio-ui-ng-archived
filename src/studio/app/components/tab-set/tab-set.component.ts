import {Component, OnInit, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from "./tab/tab.component";

@Component({
  selector: 'studio-tab-set',
  styleUrls: ['./tab-set.component.scss'],
  template: `
    <div class="studio-tab-set">
      <nav>
        <a *ngFor="let tab of tabs" 
           [class.active]="tab.active"
           (click)="setActive(tab)">{{tab.title}}</a>
      </nav>
      <div class="studio-tab-content">
        <ng-content></ng-content>
      </div>
    </div>`
})
export class TabSetComponent {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    this.setActive(this.tabs.toArray()[0]);
  }

  setActive(tab: TabComponent) {
    this.tabs.toArray().forEach(t => t.active = false);
    tab.active = true;
  }

}
