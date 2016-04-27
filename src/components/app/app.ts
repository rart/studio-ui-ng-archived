import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {HomeCmp} from "../home/home";
import {PreviewCmp} from "../preview/preview";
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, CommunicationService],
    template: '<router-outlet></router-outlet>'
}) @RouteConfig([
    {name: 'Home', path: '/', component: HomeCmp, useAsDefault: true},
    {name: 'Dashboard', path: '/dashboard', component: HomeCmp},
    {name: 'PreviewQuery', path: '/preview', component: PreviewCmp},
    {name: 'Preview', path: '/preview/:site/:page', component: PreviewCmp}
]) export class AppComponent implements OnInit {

    public title = 'Crafter Studio 3';

    constructor(private _communicator: CommunicationService) { }

    ngOnInit() {

        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }

        let origin = window.location.origin;
        let communicator = this._communicator;

        communicator.addOrigin(origin);

    }

}
