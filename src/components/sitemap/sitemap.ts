import {Component, OnInit, Input, forwardRef} from 'angular2/core';
import {Utils} from "../../classes/studio-utils";
import {ContentService} from "../../services/content-service";
import {ContentItem} from "../../classes/content-item";
import {ContentTypes} from "../../classes/content-types";
import {UnlessDirective} from "../../directives/unless-directive";
import {TreeCmp} from "../../components/tree/tree";
import {Router} from "angular2/router";

@Component({
    selector: 'sitemap',
    providers: [ContentService],
    directives: [UnlessDirective, forwardRef(() => TreeCmp)],
    templateUrl: Utils.getComponentTemplateUrl('sitemap')
}) export class SitemapCmp implements OnInit {

    items: Array<ContentItem>;
    enableSelection:boolean = false;

    constructor(private _router: Router,
                private _contentService: ContentService) {}

    ngOnInit() {
        this._contentService.getSitemap()
            .then(items => this.items = items);
    }

    addPage() {

    }

    setBulk(bulk:boolean) {
        this.enableSelection = bulk;
    }

    pageClicked(item: ContentItem) {
        this._router.navigateByUrl(`/preview/${'sample'}/${Utils.encodeURI(item.url)}`);
    }

    itemIconClassGenerator(item: ContentItem) {
        return 'ion-ios-paper-outline';
    }

}
