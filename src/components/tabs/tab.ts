import { Component, OnInit, Input } from '@angular/core';
import { Tabs } from './tabs';

@Component({
    selector: 'tab',
    template: `
    <div [hidden]="!active">
        <ng-content></ng-content>
    </div>
    `
})
export class Tab implements OnInit {
    
    @Input() active: boolean = false;
    
    @Input() tabTitle;
    
    ngOnInit() {}
}
