import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Utils} from "./studio-utils";

export class NavAttributesWrap implements OnInit {

    site: String;
    page: String;

    constructor(private _routeParams: RouteParams) {}

    ngOnInit() {

        let site = this._routeParams.get('site') || '',
            page = Utils.decodeURI(this._routeParams.get('page') || '');

        this.site = site;
        this.page = page;

    }

}
