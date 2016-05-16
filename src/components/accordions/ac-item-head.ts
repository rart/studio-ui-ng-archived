import {Component} from '@angular/core';
import {ACItem} from './ac-item';

@Component({
    selector: 'ac-item-head',
    template: `
        <div class="ac-item-head">
            <a href="#" (click)="toggleClick($event)"><ng-content></ng-content><span class="toggle-icon"></span></a>
        </div>
    `
})
export class ACItemHead {

    constructor(private acItem: ACItem) {}
    
    toggleClick(event) {
        event.preventDefault();
        this.acItem.collapsed = !this.acItem.collapsed;
        this.acItem.toggle(this.acItem.collapsed);
    }
}
