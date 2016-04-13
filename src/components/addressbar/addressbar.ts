import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import {StudioUtils} from "../../classes/studio-utils";
import {NavAttributesWrap} from "../../classes/nav-attributes-wrap";

@Component({
    selector: 'addressbar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: StudioUtils.getComponentTemplateUrl('addressbar')
}) export class AddressBarCmp extends NavAttributesWrap {

    /* *
     * Have the routeParams private variable twice, _routeParams in superclass & _rp in child...
     *  > Angular crashes if this class doesn't have this constructor:
     *    EXCEPTION: TypeError: Cannot read property 'get' of undefined in [null]
     *  > Typescript complains if `_rp` is named `_routeParams` as superclass
     *    has same variable name.
    * */
    constructor(private _rp: RouteParams) {
        super(_rp);
    }

}
