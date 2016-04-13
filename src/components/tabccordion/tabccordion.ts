import {
    Component, Directive, Input,
    QueryList, ViewContainerRef,
    TemplateRef, ContentChildren
} from 'angular2/core';

import {StudioUtils} from "../../classes/studio-utils";
import {SitemapCmp} from "../sitemap/sitemap";

enum SitePropsTabs {
    Sitemap,
    Resources,
    Properties
}

@Component({
    selector: 'tabccordion',
    directives: [SitemapCmp],
    templateUrl: StudioUtils.getComponentTemplateUrl('tabccordion')
}) export class TabccordionCmp {

    Tabs = {
        Sitemap: SitePropsTabs.Sitemap,
        Resources: SitePropsTabs.Resources,
        Properties: SitePropsTabs.Properties
    };

    private _activeTab;

    constructor () {
        this._activeTab = SitePropsTabs.Sitemap;
    }

    display(tab: SitePropsTabs) {
        this._activeTab = tab;
    }

    isSelected(tab: SitePropsTabs) : boolean {
        return this._activeTab === tab;
    }

}

/* These don't work...

@Directive({
    selector: 'tab'
}) export class Tab {

    @Input() title: string;
    private _active:boolean = false;

    constructor (public viewContainer: ViewContainerRef,
                 public templateRef: TemplateRef) { }

    @Input set active(active: boolean) {
        if (active == this._active) return;
        this._active = active;
        if (active) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.remove(0);
        }
    }

    get active(): boolean {
        return this._active;
    }

}

@Component({
    selector: 'tabs',
    template: `
        <nav>
          <a *ngFor="#tab of tabs"
             (click)="select(tab)"
             [class.active]="tab.active">{{tab.title}}</a>
        </nav>
        <ng-content></ng-content>`
}) export class Tabs {
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    select(tab: Tab) {
        this.tabs.forEach((t:Tab) => (t.active = t == tab))
    }
}

 */
