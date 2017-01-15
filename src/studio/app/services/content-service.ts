import {Injectable} from '@angular/core';
import {ContentItem} from "../classes/content-item";
import {ContentTypes} from "../classes/content-types";
import {Observable, BehaviorSubject} from "rxjs";
import {Http} from "@angular/http";
import {environment} from '../../environments/environment';
import {Site} from "../classes/site";
import {ApiAdapter} from "../classes/api-adapter";
import {V1ApiAdapter} from "../classes/v1-api-adapter";

@Injectable()
export class ContentService {

  private adapter: ApiAdapter;

  sites: BehaviorSubject<Site[]> =
    new BehaviorSubject<Site[]>([]);

  /*siteItems: BehaviorSubject<ContentItem[]> =
   new BehaviorSubject<ContentItem[]>([]);*/

  constructor(private http: Http) {
    this.adapter = this.getAdapter();
  }

  loadSites(): void {
    this.getSites()
      .subscribe(sites => this.sites.next(sites));
  }

  getSites(): Observable<any> {
    let path = environment.urlGetSites;
    let result = this.http
      .get(`${environment.urlAPI}${path}`)
      .map(response => response.json())
      .map((sites) => sites.map(object => {
        return this.adapter.getSite(object);
      }));

    result.subscribe(sites =>
      this.sites.next(sites));

    return result;
  }

  getSiteTree(site: string, path: string, depth: number): void {
    // 02:53:04
    const items = new Observable<ContentItem[]>();
  }

  getSitemap(): Observable<ContentItem[]> {
    let path = environment.urlGetContentItems;
    let result = this.request(path)
      .map(sitemap => [this.adapter.getContentItem(sitemap.item)]);
    return result;
  }

  private request(path): Observable<any> {
    return this.http
      .get(`${environment.urlAPI}${path}`)
      .map(response => response.json());
  }

  private getAdapter(): ApiAdapter {
    if (this.adapter) return this.adapter;
    else {
      let adapter;
      switch (environment.apiAdapter) {
        case 'v1':
          adapter = new V1ApiAdapter();
        // case 'v2':
        //   adapter = new V2ApiAdapter();
      }
      return adapter;
    }
  }

}
