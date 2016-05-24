import {Component, ContentChild, Renderer, ElementRef, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';
import {ACItemBody} from './ac-item-body';
import {Accordions} from './accordions';

@Component({
    selector: 'ac-item',
    template: `
        <div class="ac-item" [ngClass]="{'is-collapsed': collapsed}">
            <ng-content></ng-content>
            <span class="drag-bar" (mousedown)="onResize(true)"></span>
        </div>
    `,
    directives: [NgClass]

})
export class ACItem {
    
    public collapsed: boolean = true;

   
    @ContentChild(ACItemBody) body: ACItemBody;

    constructor(private accordions: Accordions, private renderer: Renderer, public el: ElementRef) { 
    }



    onResize(bool) {
        this.accordions.onResize(this, bool);
    }

    toggle(collapsed: boolean) {
        this.accordions.didItemToggled(this);
        this.applyToggle(collapsed);
    }
    
    applyToggle(collapsed: boolean) {
        if(collapsed){
            this.el.nativeElement.classList.remove("open");
            this.el.nativeElement.style.flex = "0 0";
        }else{
            this.el.nativeElement.classList.add("open");
            this.el.nativeElement.style.flex = "1 1";
        }
        this.collapsed = collapsed;
        this.body.toggle(collapsed);
    }

}
