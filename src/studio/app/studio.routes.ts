
import {Routes, RouterModule} from "@angular/router";
import {PreviewComponent} from "./components/preview/preview.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: 'preview/:site/:page',
    component: PreviewComponent,
    data: { title:'Studio Preview [Site & Page]' }
  },
  {
    path: 'preview/:site',
    component: PreviewComponent,
    data: { title:'Studio Preview [Site]' }
  },
  {
    path: 'preview',
    component: PreviewComponent,
    data: { title:'Studio Preview' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Studio Login' }
  },
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Studio Dashboard' }
  }
];

export const studioRoutes = RouterModule.forRoot(routes);
