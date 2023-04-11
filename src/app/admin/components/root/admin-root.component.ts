import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {LoadAdminState} from '../../state/admin-actions';

@Component({
  templateUrl: './admin-root.component.html'
})
export class AdminRootComponent {

  constructor(private store: Store) {
    store.dispatch(new LoadAdminState())
  }
}
