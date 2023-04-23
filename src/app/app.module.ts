import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {AuthModule} from "@auth0/auth0-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthHttpInterceptor} from "./auth-interceptor";
import {PublicState} from './public/state/public-state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(
      {
        domain: 'soldiertt.eu.auth0.com',
        clientId: 'ttEsPm9VdqM40bqxlsWXzxOWil6iM681',
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'https://www.yogaenpevele.fr/api',
          scope: 'openid profile email'
        },
        httpInterceptor: {
          allowedList: [
            {
              uri: 'https://localhost:4200/api/*'
            }
          ]
        }
      }
    ),
    NgxsModule.forRoot([], {developmentMode: true})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
