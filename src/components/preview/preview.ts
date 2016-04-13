import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
import {StudioUtils} from "../../classes/studio-utils";
import {TabccordionCmp} from "../tabccordion/tabccordion";
import {AddressBarCmp} from "../addressbar/addressbar";

@Component({
    selector: 'preview',
    directives: [ROUTER_DIRECTIVES, TabccordionCmp, AddressBarCmp],
    //providers: [ROUTER_PROVIDERS],
    templateUrl: StudioUtils.getComponentTemplateUrl('preview')
}) export class PreviewCmp implements OnInit {

    public site: String;
    public path: String;

    constructor(private _routeParams: RouteParams) {}

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

}
