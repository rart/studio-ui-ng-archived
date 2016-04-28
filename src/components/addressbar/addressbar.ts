import {Component, OnInit} from "angular2/core";
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

    /* *
     * Have the routeParams private variable twice, _routeParams in superclass & _rp in child...
     *  > Angular crashes if this class doesn't have this constructor:
     *    EXCEPTION: TypeError: Cannot read property 'get' of undefined in [null]
     *  > Typescript complains if `_rp` is named `_routeParams` as superclass
     *    has same variable name.
    * */
    constructor(private _rp: RouteParams,
                private _router: Router,
                private _communicator: CommunicationService) {
        super(_rp);
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

        let counter = 0;
        let communicator = this._communicator;

        communicator.addTarget(document.getElementById('previewFrame'));

        let subscription = communicator.subscribe(message => this._processMessage(message));

    }

    onGuestCheckIn(data) {
        this.page = data.url;
    }

    navigate() {
        /*this._router.navigate(['Preview', {
            site: 'sample',
            page: Utils.encodeURI(this.page)
        }]);*/
        let site = 'sample';
        let page = Utils.encodeURI(this.page);
        this._router.navigateByUrl(`/preview/${site}/${page}`);
    }

}
