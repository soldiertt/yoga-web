import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Store} from '@ngxs/store';
import {Authentication} from './public/state/actions/authentication';

@Component({
  selector: 'yog-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private authService: AuthService, private store: Store) {
    this.authService.isAuthenticated$.subscribe(bool => {
      if (bool) {
        this.store.dispatch(new Authentication())
      }
    })
  }
}
