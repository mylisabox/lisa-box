import {provideRouter, RouterConfig} from '@angular/router';
import {PagesHome} from './pages/home/home.component';

const buildedRoutes = [
  {path: '', component: PagesHome},
  {path: '', component: PagesHome}
];

export const routes: RouterConfig = buildedRoutes;

export const appRouterProviders = [
  provideRouter(routes)
];
