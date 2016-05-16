import {Component, ElementRef, Renderer, ViewChild} from '@angular/core';

@Component({
    selector: 'ac-item-body',
    template: `
        <div #body class="ac-item-body">
            <div class="inner"><ng-content></ng-content></div>
        </div>
    `
})
export class ACItemBody {

    @ViewChild('body') bodyEl: ElementRef;

    constructor(private renderer: Renderer) {}
    
    toggle(collapsed: boolean) {
        if(!collapsed){
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', 'auto');
        }else{
            this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', '0');
        }
    }
}
