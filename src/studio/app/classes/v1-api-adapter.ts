import {ApiAdapter} from "./api-adapter";
import {Site, SiteStatus} from "./site";
import {ContentItem} from "./content-item";
import {ContentTypes} from "./content-types";
import {environment} from "../../environments/environment";

export class V1ApiAdapter implements ApiAdapter {

  getContentItem({
    uri,
    path,
    children,
    internalName,
    numOfChildren,
    browserUri
  }): ContentItem {
    let item = new ContentItem();

    item.id = uri;
    item.label = internalName;
    item.childCount = numOfChildren;
    item.type = ContentTypes.Page;
    item.path = browserUri;

    children.forEach((child) => {
      item.children.push(this.getContentItem(child));
    });

    return item;
  }

  getSite({
    id,
    siteId,
    name,
    description,
    status,
    liveUrl
  }): Site {
    let site = new Site(),
        pages = [
          { title: `${name} Home`, uri: 'index.html', pages: [] },
          { title: 'About', uri: 'about.html', pages: [] },
          { title: 'Services', uri: 'services.html', pages: [{ title: 'User Experience Design', uri: 'services/ux.html' }] },
          { title: 'Contact', uri: 'contact.html', pages: [] }
        ];

    site.id = id;
    site.nickname = siteId;
    site.name = name;
    site.description = description;
    site.status = status || SiteStatus.Active;
    site.liveUrl = liveUrl;
    site.previewUrl = `${environment.urlPreviewBase}${environment.urlDemoSites}/${siteId}`;
    site.pages = pages;
    site.icon = '/favicon.ico';

    return site;
  }

}
