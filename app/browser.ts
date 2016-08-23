/// <reference path="../typings/index.d.ts"/>

import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { provideRouter } from '@angular/router';
import { appRouterProviders } from './app.routes';
import 'rxjs/Rx';
import {AppComponent} from './app';

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  appRouterProviders
])
  .catch(err => console.error(err));
