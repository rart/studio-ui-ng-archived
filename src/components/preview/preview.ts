import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
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
}) export class PreviewCmp extends NavAttributesWrap implements OnInit {

    constructor(private _rp: RouteParams,
                private _router: Router,
                private _communicator:CommunicationService) {
        super(_rp);
    }

    ngOnInit() {

        super.ngOnInit();

        let counter = 0;
        let communicator = this._communicator;

        communicator.addTarget(document.getElementById('previewFrame'));

        communicator.subscribe(message => {
            if (message.topic === MessageTopic.GUEST_CHECK_IN) {
                console.log(++counter);
                // communicator.addTarget(message.data.location);
            }
        });

        let subscription = communicator.subscribe(message => this.processMessage(message));

    }

    processMessage(message) {
        switch(message.topic) {
            case MessageTopic.GUEST_CHECK_IN:
                let site = 'sample'; // TODO use real site value
                let page = Utils.encodeURI(message.data.url);
                console.log(`Guest site checked in. Current URL is: ${message.data.url}`);
                // this._router.navigate(['Preview', { site: 'sample', page: page }]);
                // this._router.navigateByUrl(`/preview/${site}/${page}`);
                break;
        }
    }

    urlChanged() {

    }

    changeUrl() {

    }

}
