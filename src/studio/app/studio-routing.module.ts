import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {studioRoutes} from "./studio.routes";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    studioRoutes
  ],
  exports: [RouterModule],
  declarations: []
})
export class StudioRoutingModule {
}
