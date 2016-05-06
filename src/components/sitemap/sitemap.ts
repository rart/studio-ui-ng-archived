import {Component, OnInit, Input, forwardRef} from 'angular2/core';
import {Utils} from "../../classes/studio-utils";
import {ContentService} from "../../services/content-service";
import {ContentItem} from "../../classes/content-item";
import {ContentTypes} from "../../classes/content-types";
import {UnlessDirective} from "../../directives/unless-directive";
import {TreeCmp} from "../../components/tree/tree";
import {Router} from "angular2/router";
import {EventEmitter} from "angular2/core";
import {Output} from "angular2/core";
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";
import {MessageScope} from "../../classes/communicator";

@Component({
    selector: 'sitemap',
    providers: [ContentService],
    directives: [UnlessDirective, forwardRef(() => TreeCmp)],
    templateUrl: Utils.getComponentTemplateUrl('sitemap')
}) export class SitemapCmp implements OnInit {

    items: Array<ContentItem>;
    enableSelection:boolean = false;

    @Output() pageClicked = new EventEmitter();

    constructor(private _router: Router,
                private _communicator: CommunicationService,
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

    onPageClicked(item: ContentItem) {
        this.pageClicked.emit(item.url);
        this._communicator.publish(MessageTopic.ContentItemClicked, item, MessageScope.Local);
    }

    itemIconClassGenerator(item: ContentItem) {
        return 'ion-ios-paper-outline';
    }

}
