import {ContentTypes} from "../classes/content-types";

export class ContentItem {

    id: string;
    label: string;
    uri: string;
    url: string;
    path: string;
    type: ContentTypes;
    children: Array<ContentItem>;

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
        return !(this.children) && (this.children.length === 0);
    }

}
