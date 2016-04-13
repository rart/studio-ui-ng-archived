import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {StudioUtils} from "../../classes/studio-utils";
import {TabccordionCmp} from "../tabccordion/tabccordion";
import {AddressBarCmp} from "../addressbar/addressbar";
import {NavAttributesWrap} from "../../classes/nav-attributes-wrap";

@Component({
    selector: 'preview',
    directives: [ROUTER_DIRECTIVES, TabccordionCmp, AddressBarCmp],
    templateUrl: StudioUtils.getComponentTemplateUrl('preview')
}) export class PreviewCmp {

    public urlChanged() {

    }

    public changeUrl() {

    }

}
