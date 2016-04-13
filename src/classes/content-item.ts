import {ContentTypes} from "../classes/content-types";

export class ContentItem {

    id: string;
    label: string;
    uri: string;
    url: string;
    path: string;
    type: ContentTypes;
    _children: Array<ContentItem> = [];

    constructor ({id, label, uri, url, path, type, children}) {
        this.id = id;
        this.label = label;
        this.children = children;
        this.type = type;
        this.path = path;
        this.uri = uri;
        this.url = url;
    }

    isLeaf() {
        return !(this._children) || (this._children.length === 0);
    }

    set children(children) {
        this._children = children && children.map((child) => {
            if (child instanceof ContentItem) return child;
            else return new ContentItem(child);
        });
    }

    get children() {
        return this._children;
    }

}
