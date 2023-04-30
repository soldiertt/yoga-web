import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {AuthModule} from "@auth0/auth0-angular";
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import {CoreModule} from "../core/core.module";
import {LoadingComponent} from "./components/loading/loading.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

registerLocaleData(localeFr, 'fr')

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
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
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([], {developmentMode: true})
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
