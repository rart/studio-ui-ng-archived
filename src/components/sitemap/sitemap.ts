import {Component, OnInit} from 'angular2/core';
import {StudioUtils} from "../../classes/studio-utils";
import {ContentService} from "../../services/content-service";
import {ContentItem} from "../../classes/content-item";
import {ContentTypes} from "../../classes/content-types";

@Component({
    selector: 'sitemap',
    providers: [ContentService],
    templateUrl: StudioUtils.getComponentTemplateUrl('sitemap')
}) export class SitemapCmp implements OnInit {

    public items: Array<ContentItem>;

    constructor(private _contentService: ContentService) {}

    ngOnInit() {
        this._contentService.getSitemap()
            .then(items => this.items = items);
    }

    addPage() {}

    setBulk() {}

}
