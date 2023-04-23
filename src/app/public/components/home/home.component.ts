import {Component, Inject} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Card} from '../../../shared/model/card';
import {CreateCard} from '../../state/actions/card-actions';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  @Select(state => state.public.cards) cards$: Observable<Card[]>

  constructor(@Inject(DOCUMENT) public document: Document,
              public auth: AuthService,
              public store: Store) {
  }

  orderCard(): void {
    this.store.dispatch(new CreateCard())
  }
}
