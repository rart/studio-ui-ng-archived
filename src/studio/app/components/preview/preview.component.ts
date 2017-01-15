import {Component, OnInit} from '@angular/core';
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils, StringUtils} from "../../classes/studio-utils";
import {ContentService} from "../../services/content-service";
import {Site} from "../../classes/site";
import {environment} from "../../../environments/environment";

declare var $: any;

@Component({
  selector: 'studio-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  // private tabs: PreviewTab[];
  private url: string = '';

  // Updating the URL when navigation comes from guest causes the
  // iframe page to load twice. Hence "url" not updated when nav
  // occurs from guest hence:
  // Nav from guest causes the url property to be out of sync
  // with the iframe until navigation occurs from the host again.
  // While out of sync if user tries to nav to the page which equals
  // to the out of sync url, navigation won't occur on the iframe.
  private navFromGuest: boolean = false;

  sites: Site[] = [];

  site: Site;     // The active site
  siteNickname: string; // The active site according to URL
  page: string;   // The active page

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private communicator:CommunicationService
  ) { }

  ngOnInit() {

    this.contentService.getSites()
      .subscribe(sites => {
        this.sites = sites;
        this.setSiteBySiteName(this.activatedRoute.snapshot.params['site']);
        this.setUrl();
      });

    this.activatedRoute.params
      .subscribe(params => {
        this.siteNickname = params['site'];
        this.page = params['page'] ? Utils.decodeURI(params['page']) : '';
      });

    this.communicator.addOrigin(window.location.origin);      // Self
    this.communicator.addOrigin(environment.urlPreviewBase);  // Guest TODO: load from config.
    this.communicator.addTarget(document.getElementById('previewFrame'));
    this.communicator.subscribe(message => this.processMessage(message));

    $('.ui.preview-tools.accordion')
      .accordion('destroy')
      .accordion({
        duration: 0,
        exclusive:false,
        animateChildren: false
      });

  }

  /*get url(): string {
    if (this.site) {
      let base = this.site.previewUrl;
      let uri = this.page;
      return `${base}/${uri}`;
    } else {
      return '';
    }
  }*/

  setUrl(page?): void {
    this.navFromGuest = false;
    if (this.site) {
      let base = this.site.previewUrl;
      let uri = page || this.page;
      this.url = StringUtils.startsWith(uri, '/')
        ? `${base}${uri}`
        : `${base}/${uri}`;
    } else {
      this.url ='';
    }
  }

  back() {

  }

  changeSite(site: Site) {
    this.site = site;
    this.router.navigate(['/preview', site.nickname]);
    this.setUrl('');
  }

  forward() {

  }

  reload() {
    this.communicator.publish(MessageTopic.GUEST_RELOAD_REQUEST);
  }

  urlRequested(value) {
    if (StringUtils.startsWith(value, '/')) {
      value = value.substr(1);
    }
    this.router.navigate(['/preview', this.siteNickname, Utils.encodeURI(value)]);
    if (this.navFromGuest && StringUtils.contains(this.url, value)) {
      this.communicator.publish(
        MessageTopic.GUEST_NAV_REQUEST,
        this.url);
    }
    this.setUrl(value);
  }

  private setSiteBySiteName(siteName: string): void {
    let site = this.getSiteBySiteName(siteName);
    this.site = site;
  }

  private getSiteBySiteName(siteName: string): Site {
    let matches = this.sites.filter(site => {
      return site.nickname === siteName;
    });
    return matches[0];
  }

  private processMessage(message) {
    switch(message.topic) {
      case MessageTopic.GUEST_CHECK_IN:
        this.onGuestCheckIn(message.data);
        break;
      case MessageTopic.ContentItemClicked:
        // this.onSitemapItemClicked(message.data);
        break;
    }
  }

  private onGuestCheckIn(data) {
    let site = this.site; // TODO use real site value
    let path = data.location.replace(`${site.previewUrl}/`, '');
    let page = this.page;
    // Only navigate if page !== path meaning navigation came from guest
    if (path !== page) {
      this.navFromGuest = true;
      this.router.navigate(['/preview', this.siteNickname, Utils.encodeURI(path)]);
    }
  }

}
