import {Component, OnInit} from 'angular2/core';
import {StudioUtils} from "../../classes/studio-utils";

@Component({
    selector: 'addressbar',
    templateUrl: StudioUtils.getComponentTemplateUrl('addressbar')
}) export class AddressBarCmp {
    constructor () {}
}
