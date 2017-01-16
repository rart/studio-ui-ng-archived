import {Component, OnInit} from '@angular/core';
import {CommunicationService} from "../../services/communication-service";
import {MessageTopic} from "../../classes/communicator";
import {ActivatedRoute, Router} from "@angular/router";
import {Utils, StringUtils} from "../../classes/studio-utils";
import {ContentService} from "../../services/content-service";
import {Site} from "../../classes/site";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

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
  private navOccurredFromGuest: boolean = false;

  sites: Site[] = [];   // Site roster
  private sitesStream: Observable<Site[]>;   // Site roster

  site: Site;           // The active site
  page: string;         // The active page
  siteNickname: string; // The active site according to URL

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private communicator: CommunicationService
  ) {
    this.sitesStream = this.contentService.sites;
  }

  ngOnInit() {

    this.contentService.loadSites();

    // this.contentService.getSites()
    this.sitesStream
      .combineLatest(this.activatedRoute.params, (sites, params) => {
        return {
          sites: sites,
          params: params
        }
      })
      .subscribe(response => {

        let sites = response.sites;
        let params = response.params;

        this.sites = sites;
        this.siteNickname = params['site'];
        this.page = params['page'] ? Utils.decodeURI(params['page']) : '';

        this.setSiteByNickname(this.activatedRoute.snapshot.params['site']);
        if (!this.navOccurredFromGuest) this.setUrl();

      });

    // this.communicator.addOrigin(window.location.origin);      // Self
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

  setUrl(page?): void {
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
    this.resetNavigationOrigin();

  }

  changeSite(site: Site) {
    this.resetNavigationOrigin();
    this.router.navigate(['/preview', site.nickname]);
  }

  forward() {
    this.resetNavigationOrigin();
  }

  reload() {
    this.communicator.publish(MessageTopic.GUEST_RELOAD_REQUEST);
  }

  urlRequested(value) {
    if (StringUtils.startsWith(value, '/')) {
      value = value.substr(1);
    }
    if (this.navOccurredFromGuest && StringUtils.contains(this.url, value)) {
      this.communicator.publish(
        MessageTopic.GUEST_NAV_REQUEST,
        this.url);
    } else {
      this.resetNavigationOrigin();
      this.router.navigate(['/preview', this.siteNickname, Utils.encodeURI(value)]);
    }
  }

  private resetNavigationOrigin() {
    this.navOccurredFromGuest = false;
  }

  private setSiteByNickname(siteName: string): void {
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
      default:
        console.log('PreviewComponent.processMessage: Unhandled messages ignored.', message);
        break;
    }
  }

  private onGuestCheckIn(data) {
    let site = this.site;
    let path = data.location.replace(`${site.previewUrl}/`, '');
    let page = this.page;
    // Only navigate if page !== path meaning navigation came from guest
    // (e.g. nav through a link inside guest website, page redirect inside guest website)
    if (path !== page) {
      this.navOccurredFromGuest = true;
      this.router.navigate(['/preview', this.siteNickname, Utils.encodeURI(path)]);
    }
    console.debug(`Guest Arrival @ Host`, data);
  }

}
