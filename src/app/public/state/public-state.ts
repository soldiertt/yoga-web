import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Card} from '../../shared/model/card';
import {AuthService} from '@auth0/auth0-angular';
import {mergeMap, tap} from 'rxjs';
import {Authentication} from './actions/authentication';
import {CardRestService} from '../../shared/services/card-rest-service';
import {BookSlot, CreateCard} from './actions/card-actions';
import {append, patch, updateItem} from '@ngxs/store/operators';
import {Slot} from '../../shared/model/slot';
import {LoadPublicState} from './actions/load-public-state';
import {SlotRestService} from '../../shared/services/slot-rest-service';

interface PublicStateModel {
  loading: boolean;
  userId?: string;
  canBook: boolean;
  cards: Card[];
  slots: Slot[];
}
@State<PublicStateModel>({
  name: 'public',
  defaults: {
    loading: true,
    canBook: false,
    cards: [],
    slots: []
  }
})
@Injectable()
export class PublicState {

  @Selector()
  static bookedSlots(state: PublicStateModel) {
    return state.cards
      .flatMap(c => c.slots);
  }

  constructor(private auth: AuthService,
              private slotRestService: SlotRestService,
              private cardRestService: CardRestService) {
  }

  @Action(LoadPublicState)
  loadPublicState(ctx: StateContext<PublicStateModel>) {
    return this.slotRestService.publicFindAll().pipe(
      tap(slots => {
        ctx.patchState({slots})
      })
    )
  }

  @Action(Authentication)
  authentication(ctx: StateContext<PublicStateModel>) {
    return this.auth.user$.pipe(
      tap(user => {
        ctx.patchState({userId: user!.sub})
      }),
      mergeMap(user => this.cardRestService.privateFindByUserId(user!.sub!)),
      tap(cards => {
        const canBook = cards.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
        ctx.patchState({cards, canBook})
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

  @Action(BookSlot)
  bookSlot(ctx: StateContext<PublicStateModel>, action: BookSlot) {
    const userId = ctx.getState().userId;
    if (userId) {
      return this.cardRestService.privateBook(userId, action.id).pipe(
        tap(card => {
          ctx.setState(patch({cards: updateItem(c => c.id === card.id, card)}))
          const canBook = ctx.getState().cards.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
          ctx.patchState({canBook})
        })
      )
    }
    return
  }
}
