import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

enum Tabs {
    Sitemap,
    Resources,
    Properties
}

@Component({
    selector: 'preview',
    directives: [ROUTER_DIRECTIVES],
    //providers: [ROUTER_PROVIDERS],
    templateUrl: 'components/preview/preview.html'
}) export class PreviewCmp implements OnInit {

    public site: String;
    public path: String;

    public Tabs = {
        Sitemap: Tabs.Sitemap,
        Resources: Tabs.Resources,
        Properties: Tabs.Properties
    };

    private _activeTab;

    constructor(private _routeParams: RouteParams) {
        this._activeTab = Tabs.Sitemap;
    }

    public ngOnInit() {

        let site = this._routeParams.get('site') || '',
            path = decodeURIComponent(this._routeParams.get('page') || '');

        this.site = site;
        this.path = path;

    }

    public urlChanged() {

    }

    public changeUrl() {

    }

    public display(tab: Tabs) {
        this._activeTab = tab;
    }

    public isSelected(tab: Tabs) : boolean {
        return this._activeTab === tab;
    }

}
