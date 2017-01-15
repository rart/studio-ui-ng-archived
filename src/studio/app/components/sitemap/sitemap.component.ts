import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ContentItem} from "../../classes/content-item";
import {ContentService} from "../../services/content-service";

@Component({
  selector: 'studio-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent implements OnInit {

  items: Array<ContentItem>;
  enableSelection: boolean = false;

  @Output() navigate = new EventEmitter();

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getSitemap()
      .subscribe(items => {
        this.items = items;
      });
  }

  onPageClicked(item: ContentItem) {
    this.navigate.emit(item.path);
  }

  itemIconClassGenerator(item: ContentItem) {
    return 'ion-ios-paper-outline';
  }

  toggleSelection() {
    this.enableSelection = !this.enableSelection;
  }

  createPage() {
    console.log('createPage');
  }

}
