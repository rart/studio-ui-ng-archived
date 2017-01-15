import {Site} from "./site";
import {ContentItem} from "./content-item";

export interface ApiAdapter {

  getSite(object: any): Site;
  getContentItem(object: any): ContentItem;

}
