import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Site} from "../../classes/site";
import {ContentService} from "../../services/content-service";
import {BehaviorSubject, Observable} from "rxjs";

declare var $: any;

@Component({
  selector: 'studio-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss']
})
export class AddressBarComponent implements OnInit {

  private sites: Observable<Site[]>;   // Site roster

  @Input() site: Site;      // The active site
  @Input() page: string;    // The active page

  @Output() back = new EventEmitter();
  @Output() forward = new EventEmitter();
  @Output() navigate = new EventEmitter();
  @Output() reload = new EventEmitter();
  @Output() changeSite = new EventEmitter();

  constructor(
    private contentService: ContentService
  ) {
    // this.sites = this.contentService.sites;
  }

  ngOnInit() {
    this.sites = this.contentService.sites;
    this.sites.subscribe(() => {
      this.initSemantic();
    });
  }

  initSemantic() {
    setTimeout(() => {

      $('#addressbarSiteSelector')
        .dropdown('destroy')
        .dropdown({ duration: 0 });

      let $input = $('.input-skin:first');

      $input
        .search('destroy');

      if (this.site) {

        $input.search({
          source: this.site.pages,
          showNoResults: false,
          searchFields: ['title', 'uri'],
          fields: { title : 'uri' },
          type: 'custom',
          templates: {
            custom: function(response) {
              let matches = response.results;
              let html = '';
              $.each(matches, function (i, match) {
                html += `
                  <a class="result">
                    ${match.title} &laquo;<span class="title">${match.uri}</span>&raquo;
                  </a>`;
              });
              return html;
            }
          }
        });

        $input.find('.results').css({
          right: '0',
          left: 'auto',
          width: '85%'
        });

      }

    });
  }

  siteChanged(site) {
    if (site.nickname !== this.site.nickname){
      this.changeSite.emit(site);
    }
  }

  urlRequested(value) {
    this.navigate.emit(value);
  }

  backClicked() {
    this.back.emit(null);
  }

  forwardClicked() {
    this.forward.emit(null);
  }

  reloadClicked() {
    this.reload.emit(null);
  }

  shareClicked() {

  }

  newTabClicked() {

  }

  showSiteMapClicked() {

  }

}
