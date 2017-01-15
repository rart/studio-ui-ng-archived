import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StudioComponent } from './components/studio/studio.component';
import { PreviewComponent } from './components/preview/preview.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';

import { ContextBarComponent } from './components/context-bar/context-bar.component';
import { CommunicationService } from "./services/communication-service";
import { SafeUrlPipe } from './safe-url.pipe';
import { TreeComponent } from './components/tree/tree.component';
import { TabSetComponent } from './components/tab-set/tab-set.component';
import { TabComponent } from './components/tab-set/tab/tab.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { PropertyExplorerComponent } from './components/property-explorer/property-explorer.component';
import { ResourceExplorerComponent } from './components/resource-explorer/resource-explorer.component';
import { ContentService } from "./services/content-service";
import { StudioRoutingModule } from "./studio-routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    StudioComponent,
    PreviewComponent,
    AddressBarComponent,
    ContextBarComponent,
    SafeUrlPipe,
    TreeComponent,
    TabSetComponent,
    TabComponent,
    SitemapComponent,
    PropertyExplorerComponent,
    ResourceExplorerComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StudioRoutingModule
  ],
  providers: [CommunicationService, ContentService],
  bootstrap: [StudioComponent]
})
export class StudioModule {
}
