import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, Location, CanReuse, ComponentInstruction} from "angular2/router";
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

    constructor(private _rp: RouteParams,
                private _router: Router,
                private _location: Location,
                private _communicator:CommunicationService) {
        super(_rp);
    }

    private _processMessage(message) {
        switch(message.topic) {
            case MessageTopic.GUEST_CHECK_IN:
                this.onGuestCheckIn(message.data);
                break;
        }
    }

    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        console.log(next, prev)
        return true;
    }

    ngOnInit() {

        super.ngOnInit();

        let counter = 0;
        let communicator = this._communicator;

        communicator.addTarget(document.getElementById('previewFrame'));

        let subscription = communicator.subscribe(message => this._processMessage(message));

    }

    urlChanged() {

    }

    changeUrl() {

    }

    onGuestCheckIn(data) {
        let site = 'sample'; // TODO use real site value
        let path = data.url;
        // this._router.navigate(['Preview', { site: site, page: Utils.encodeURI(path) }]);
        this._router.navigateByUrl(`/preview/${site}/${Utils.encodeURI(path)}`);
        // this._location.go(`/preview/${site}/${Utils.encodeURI(path)}`);
        // console.log(`Guest site checked in. Current URL is: ${path}`);
    }

}
