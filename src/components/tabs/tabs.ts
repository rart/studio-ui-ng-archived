import { Component, ContentChildren, QueryList, OnInit, AfterContentInit} from '@angular/core';
import { Tab } from './tab';

@Component({
    selector: 'tabs',
    template: `
    <nav>
        <a href="javascript:void(0)" *ngFor="let tab of tabs"
            (click)="selectTab(tab)"
            [ngClass]="{'active': tab.active}">
            {{tab.tabTitle}}
        </a>
    </nav>
    <ng-content></ng-content>
    `
})
export class Tabs implements OnInit, AfterContentInit {
    
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    
    constructor() {}
    
    ngOnInit() {
    }
    
    ngAfterContentInit() {
        // //get all active tabs
        // let activeTabs = this.tabs.filter((tab)=>tab.active);

        // // if there is no active tab set, activate the first
        // if(activeTabs.length === 0) {
        //     this.selectTab(this.tabs.first);
        // }
    }
    
    selectTab(tab:Tab) {
        this.tabs.forEach((tab) => {tab.active = false});
        tab.active = true
    }
}
