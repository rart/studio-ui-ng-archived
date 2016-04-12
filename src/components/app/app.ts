import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HomeCmp} from "../home/home";

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS],
    template: '<router-outlet></router-outlet>'
}) @RouteConfig([
    { path: '/', name: 'Home', component: HomeCmp, useAsDefault: true }/*,
    { path: '/preview', name: 'preview', component: HeroesComponent }*/
]) export class AppComponent {

    public title = 'Crafter Studio 3';

}
