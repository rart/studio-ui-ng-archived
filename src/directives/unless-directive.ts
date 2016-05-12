import {Directive, Input} from '@angular/core';
import {TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[unless]'
})  
export class UnlessDirective {
    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef
    ) { }
    @Input() set unless(condition: boolean) {
        if (!condition) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }
}
