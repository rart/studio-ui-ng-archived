import {Component, DynamicComponentLoader, ViewContainerRef, Input} from '@angular/core';
import {SitemapCmp} from "../sitemap/sitemap";

@Component({
	selector: 'render-component',
	template: ''
})

export class RenderComponents {
	@Input() ComponentName;
	constructor(private dcl: DynamicComponentLoader, private viewContainerRef: ViewContainerRef) { 
		// create a switch
		if (this.ComponentName = "sitemap") {
			this.dcl.loadNextToLocation(SitemapCmp, this.viewContainerRef);
		}

	}

}