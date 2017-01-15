import {ContentTypes} from "../classes/content-types";

export class ContentItem {

    id: string;
    label: string;
    path: string;
    type: ContentTypes;
    children: Array<ContentItem> = [];
    childCount: number;

    isLeaf() {
        return this.childCount === 0;
    }

}
