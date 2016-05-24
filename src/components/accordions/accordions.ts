import {Component, Input, ContentChildren, QueryList, forwardRef} from '@angular/core';
import {NgClass} from '@angular/common';
import {ACItem} from './ac-item';

@Component({
    selector: 'accordions',
    template: `
        <div class="accordions" [ngClass]="{'resizing': isResizing}">
            <ng-content></ng-content>
        </div>
    `,
    host: { '(mousemove)': 'onMouseMove($event)', '(mouseup)': 'onResize(null,false)' }
})
export class Accordions {
    
    @Input() multiple: boolean = true
    
    @ContentChildren(forwardRef(() => ACItem)) items: QueryList<ACItem>;

    public isResizing: boolean = false;
    public resizingElement = null; 
    public itemTest: ACItem = null;
    
    constructor() { }

    onResize(item: ACItem, bool) {
        this.isResizing = bool;
        this.resizingElement = item; 
    }

    onMouseMove(event){
        if (this.isResizing == false) return false;
        let flexBasis = event.clientY - this.resizingElement.el.nativeElement.offsetTop;
        this.resizingElement.el.nativeElement.style.flex = "0 0";
        this.resizingElement.el.nativeElement.style.flexBasis = flexBasis + "px";
        if (flexBasis > 100 ) {
            this.resizingElement.body.toggle(false)
        };
        if (flexBasis < 90){
            this.resizingElement.body.toggle(true)
        }
    }
    
    didItemToggled(item: ACItem) {
        // on not multiple, it will collpase the rest of items
        if (!this.multiple) {
            this.items.toArray().forEach(function(i) { 
                if (i !== item) {
                    i.applyToggle(true)
                }
            });
        }
    }

}
