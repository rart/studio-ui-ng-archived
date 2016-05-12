import {Injectable} from '@angular/core';
import {ContentItem} from "../classes/content-item";
import {ContentTypes} from "../classes/content-types";

@Injectable() export class ContentService {
    getSitemap() {
        return Promise.resolve(SITEMAP.map(item => new ContentItem(item)));
    }

    getSitemapSlowly() {
        return new Promise<ContentItem[]>(resolve =>
            setTimeout(()=>resolve(SITEMAP.map(item => new ContentItem(item))), 2000) // 2 seconds
        );
    }
}

var SITEMAP = [
    {"id": "1", "label": "Home", "uri": "", "url": "/sample-guest/index.html", "path": "", "type": ContentTypes.Page, "children": []},
    {
        "id": "2",
        "label": "Services",
        "uri": "",
        "url": "/sample-guest/services.html",
        "path": "",
        "type": ContentTypes.Page,
        "children": [{
            "id": "4",
            "label": "User Experience",
            "uri": "",
            "url": "/services/ux",
            "path": "",
            "type": ContentTypes.Page,
            "children": []
        }, {
            "id": "5",
            "label": "Coding",
            "uri": "",
            "url": "/services/coding",
            "path": "",
            "type": ContentTypes.Page,
            "children": []
        }]
    },
    {
        "id": "3",
        "label": "About",
        "uri": "",
        "url": "/sample-guest/about.html",
        "path": "",
        "type": ContentTypes.Page,
        "children": []
    }
];
