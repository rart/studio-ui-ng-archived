import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Utils} from "./studio-utils";

export class NavAttributesWrap implements OnInit {

    site: string;
    page: string;

    constructor(protected _routeParams: RouteParams) {}

    protected _parseRouteParams(site, page) {
        this.site = site;
        this.page = Utils.decodeURI(page);
    }

    ngOnInit() {
        let site = this._routeParams.get('site') || '',
            page = this._routeParams.get('page') || '';
        this._parseRouteParams(site, page);
    }

}
