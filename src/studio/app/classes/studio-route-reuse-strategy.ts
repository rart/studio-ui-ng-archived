
import {RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot} from "@angular/router";
import {PreviewComponent} from "../components/preview/preview.component";

export class StudioRouteReuseStrategy implements RouteReuseStrategy {

  handlers: {[key: string]: DetachedRouteHandle} = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldDetach', route);
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.debug('CustomReuseStrategy:store', route, handle);
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldAttach', route);
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // console.debug('CustomReuseStrategy:retrieve', route);
    if (!route.routeConfig) return null;
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    // console.debug('CustomReuseStrategy:shouldReuseRoute', future, current);
    // console.debug('CustomReuseStrategy:shouldReuseRoute', future.component, future.component === PreviewComponent);
    if (
      future.component === PreviewComponent &&
      current.component === PreviewComponent &&
      future.url[0].path === current.url[0].path
    ) {
      console.debug('REUSING!');
      return true;
    } else {
      return future.routeConfig === current.routeConfig;
    }
  }

}
