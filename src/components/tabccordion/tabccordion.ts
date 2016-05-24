import {
    Component, Directive, Input,
    QueryList, ViewContainerRef,
    TemplateRef, ContentChildren
} from '@angular/core';

import {Utils} from "../../classes/studio-utils";
//import {SitemapCmp} from "../sitemap/sitemap";

import {Tabs} from "../tabs/tabs";
import {Tab} from "../tabs/tab";

import {ACItemBody} from '../accordions/ac-item-body';
import {ACItemHead} from '../accordions/ac-item-head';
import {ACItem} from '../accordions/ac-item';
import {Accordions} from '../accordions/accordions';

import {RenderComponents} from '../render/renderComponents';

var Items = [
    {
        "id": 1,
        "label": "Site",
        "content": [
            {
            "id": 1,
            "type": "tabs",
            "children": [{ "label": "Sitemap","render":"sitemap","active":true}, { "label": "Resources" }, { "label": "Properties" }]
            }
        ]

    },
    {
        "id": 1,
        "label": "Page",
        "content": [{
            "id": 1,
            "type": "list",
            "children": [{ "label": "Meta-data" }, { "label": "Selection" }, { "label": "Widgets" }, { "label": "Media" }]

        }]

    },
];

@Component({
    selector: 'tabccordion',
    directives: [Tabs, Tab, Accordions, ACItem, ACItemHead, ACItemBody, RenderComponents],
    templateUrl: Utils.getComponentTemplateUrl('tabccordion')
}) export class TabccordionCmp {
    Items = Items;
    constructor () {}

}


