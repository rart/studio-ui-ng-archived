import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, CanReuse, ComponentInstruction} from "angular2/router";
import {Utils} from "../../classes/studio-utils";
import {TabccordionCmp} from "../tabccordion/tabccordion";
import {AddressBarCmp} from "../addressbar/addressbar";
import {NavAttributesWrap} from "../../classes/nav-attributes-wrap";
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";

@Component({
    selector: 'preview',
    templateUrl: Utils.getComponentTemplateUrl('preview'),
    directives: [ROUTER_DIRECTIVES, TabccordionCmp, AddressBarCmp]
}) export class PreviewCmp extends NavAttributesWrap implements OnInit, CanReuse {

    constructor(protected _routeParams: RouteParams,
                private _router: Router,
                private _communicator:CommunicationService) {
        super(_routeParams);
    }

    private _processMessage(message) {
        switch(message.topic) {
            case MessageTopic.GUEST_CHECK_IN:
                this.onGuestCheckIn(message.data);
                break;
        }
    }

    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        if (next.urlPath !== prev.urlPath) {
            this._parseRouteParams(next.params['site'], next.params['page']);
        }
        return true;
    }

    ngOnInit() {

        super.ngOnInit();

        let communicator = this._communicator;

        communicator.addTarget(document.getElementById('previewFrame'));
        communicator.subscribe(message => this._processMessage(message));

    }

    urlChanged() {

    }

    changeUrl() {

    }

    onGuestCheckIn(data) {
        let site = 'sample'; // TODO use real site value
        let path = data.url;
        this._router.navigateByUrl(`/preview/${site}/${Utils.encodeURI(path)}`);
    }

}
