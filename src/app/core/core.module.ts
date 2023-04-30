import {NgModule} from '@angular/core';
import {SlotRestService} from './services/slot-rest-service';
import {environment} from '../../environments/environment';
import {CardRestService} from './services/card-rest-service';
import {UserRestService} from './services/user-rest-service';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_LUXON_DATE_FORMATS} from "@angular/material-luxon-adapter";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthHttpInterceptor} from "./interceptor/auth-interceptor";
import {LoadingInterceptor} from "./interceptor/loading-interceptor";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CardRestService,
    SlotRestService,
    UserRestService,
    {provide: 'API_ENDPOINT', useValue: environment.apiEndpoint},
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ]
})
export class CoreModule {}
