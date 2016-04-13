import {OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";

export class NavAttributesWrap implements OnInit {

    site: String;
    path: String;

    constructor(private _routeParams: RouteParams) {}

    public ngOnInit() {

        let site = this._routeParams.get('site') || '',
            path = decodeURIComponent(this._routeParams.get('page') || '');

        this.site = site;
        this.path = path;

    }

}
