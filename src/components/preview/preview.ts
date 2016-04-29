import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, CanReuse, ComponentInstruction, Location} from "angular2/router";
import {Utils} from "../../classes/studio-utils";
import {TabccordionCmp} from "../tabccordion/tabccordion";
import {AddressBarCmp} from "../addressbar/addressbar";
import {NavAttributesWrap} from "../../classes/nav-attributes-wrap";
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";
import {ContentItem} from "../../classes/content-item";

@Component({
    selector: 'preview',
    templateUrl: Utils.getComponentTemplateUrl('preview'),
    directives: [ROUTER_DIRECTIVES, TabccordionCmp, AddressBarCmp]
}) export class PreviewCmp extends NavAttributesWrap implements OnInit, CanReuse {

    /**
     * Causes `routerCanReuse` not to update the site & page variables.
     * Used to prevent (re)loading the guest site twice when the iframe
     * location it's changed from within the iframe itself (i.e. a link
     * clicked inside of the iframe instead of navigating from a studio
     * control.)
     */
    private _guestCheckInFlag: boolean = false;
    /**
     * Signals when the guest page rendered by the iframe is not what the model
     * state ([@link page], [@link site]) reflects. This happens when navigation
     * occurs from the iframe and not from studio and the 'dirty' state is allowed
     * to avoid guest site/page loading twice. Works together with [@link _guestCheckInFlag].
     * Variable _dirty, is a measure for back/forward button (history) navigation. When the
     * state is 'dirty', the iframe might not refresh due it's src thought to be already what
     * the URL reflects but isn't.
     * @type {boolean}
     * @private
     */
    private _dirty: boolean = false;

    constructor(private _router: Router,
                private _location: Location,
                protected _routeParams: RouteParams,
                private _communicator:CommunicationService) {
        super(_routeParams);
    }

    onAddressbarChange(addressbarValue: string) {
        this._navigate(addressbarValue);
    }

    onSitemapItemClicked(contentItem: ContentItem) {
        this._navigate(contentItem.url);
    }

    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        if (next.urlPath !== prev.urlPath) {
            if (this._guestCheckInFlag) {
                this._dirty = true;
            } else {
                if (this._dirty) {
                    document.getElementById('previewFrame').setAttribute('src', this.page);
                }
                this._parseRouteParams(next.params['site'], next.params['page']);
                this._dirty = false;
            }
        }
        this._guestCheckInFlag = false;
        return true;
    }

    ngOnInit() {

        super.ngOnInit();

        let communicator = this._communicator;

        communicator.addTarget(document.getElementById('previewFrame'));
        communicator.subscribe(message => this._processMessage(message));

    }

    onGuestCheckIn(data) {
        let site = 'sample'; // TODO use real site value
        let path = data.url;
        this._guestCheckInFlag = true;
        this._router.navigateByUrl(`/preview/${site}/${Utils.encodeURI(path)}`);
    }

    onBack() {
        this._location.back();
    }

    onForward() {
        this._location.forward();
    }

    private _navigate(url) {

        let site = this.site;
        let page = Utils.encodeURI(url);

        this.page = page;
        this.site = site;
        this._router.navigateByUrl(`/preview/${site}/${page}`);

    }

    private _processMessage(message) {
        switch(message.topic) {
            case MessageTopic.GUEST_CHECK_IN:
                this.onGuestCheckIn(message.data);
                break;
            case MessageTopic.ContentItemClicked:
                this.onSitemapItemClicked(message.data);
                break;
        }
    }

}
