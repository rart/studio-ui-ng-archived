import {Component, OnInit, EventEmitter, Output} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "angular2/router";

import {Utils} from "../../classes/studio-utils";
import {NavAttributesWrap} from "../../classes/nav-attributes-wrap";
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";

@Component({
    selector: 'addressbar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: Utils.getComponentTemplateUrl('addressbar')
}) export class AddressBarCmp extends NavAttributesWrap implements OnInit {

    @Output() public back: EventEmitter = new EventEmitter();
    @Output() public forward: EventEmitter = new EventEmitter();
    @Output() public input: EventEmitter = new EventEmitter();

    constructor(protected _routeParams: RouteParams,
                private _communicator: CommunicationService) {
        super(_routeParams);
    }

    private _processMessage(message) {
        switch(message.topic) {
            case MessageTopic.GUEST_CHECK_IN:
                this.onGuestCheckIn(message.data);
                break;
        }
    }

    ngOnInit() {

        super.ngOnInit();

        this._communicator.subscribe((message) => this._processMessage(message));

    }

    onGuestCheckIn(data) {
        this.page = data.url;
    }

    navigate(value) {
        // value === this.page
        this.input.emit(this.page);
    }

    backClicked() {
         this.back.emit();
    }

    forwardClicked() {
        this.forward.emit();
    }

}
