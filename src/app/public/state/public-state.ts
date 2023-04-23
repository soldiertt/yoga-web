import {Action, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Card} from '../../shared/model/card';
import {AuthService} from '@auth0/auth0-angular';
import {mergeMap, tap} from 'rxjs';
import {Authentication} from './actions/authentication';
import {CardRestService} from '../../shared/services/card-rest-service';
import {CreateCard} from './actions/card-actions';
import {append, patch} from '@ngxs/store/operators';

interface PublicStateModel {
  userId?: string;
  cards: Card[];
}
@State<PublicStateModel>({
  name: 'public',
  defaults: {
    cards: []
  }
})
@Injectable()
export class PublicState {

  constructor(private auth: AuthService,
              private cardRestService: CardRestService) {
  }
  @Action(Authentication)
  authentication(ctx: StateContext<PublicStateModel>) {
    return this.auth.user$.pipe(
      tap(user => {
        ctx.patchState({userId: user!.sub})
      }),
      mergeMap(user => this.cardRestService.privateFindByUserId(user!.sub!)),
      tap(cards => {
        ctx.patchState({cards})
      })
    )
  }

  @Action(CreateCard)
  createCardRequest(ctx: StateContext<PublicStateModel>) {
    const userId = ctx.getState().userId;
    if (userId) {
      return this.cardRestService.privateCreate(userId).pipe(
        tap(card => {
          ctx.setState(patch({cards: append([card])}))
        })
      )
    }
    return
  }
}
