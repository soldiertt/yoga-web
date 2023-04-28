import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Card} from '../../shared/model/card';
import {AuthService, User} from '@auth0/auth0-angular';
import {mergeMap, tap} from 'rxjs';
import {Authentication} from './actions/authentication';
import {CardRestService} from '../../shared/services/card-rest-service';
import {BookSlot, CreateCard, UnbookSlot} from './actions/card-actions';
import {append, patch, updateItem} from '@ngxs/store/operators';
import {Slot} from '../../shared/model/slot';
import {LoadPublicState} from './actions/load-public-state';
import {SlotRestService} from '../../shared/services/slot-rest-service';
import {UserProfile} from '../../shared/model/user-profile';
import {SaveProfile} from './actions/save-profile';
import {UserRestService} from '../../shared/services/user-rest-service';

interface PublicStateModel {
  loading: boolean;
  userId?: string;
  profile?: UserProfile;
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
  static profileComplete(state: PublicStateModel): boolean {
    return !!state.profile?.firstName && !!state.profile?.lastName && !!state.profile?.phone;
  }

  @Selector()
  static bookedSlots(state: PublicStateModel) {
    return state.cards
      .flatMap(c =>
        c.slots.map(s => ({card: c, slot: s}))
      );
  }

  constructor(private auth: AuthService,
              private userRestService: UserRestService,
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
        ctx.patchState({userId: user!.sub, profile: this.buildProfile(user)})
      }),
      mergeMap(() => this.cardRestService.privateFindByUserId()),
      tap(cards => {
        const canBook = cards.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
        ctx.patchState({cards, canBook})
      })
    )
  }

  @Action(SaveProfile)
  saveProfile(ctx: StateContext<PublicStateModel>, action: SaveProfile) {
    return this.userRestService.privateUpdateProfile(action.userProfile).pipe(
      tap(profile => {
        ctx.patchState({profile})
      })
    )
  }

  @Action(CreateCard)
  createCardRequest(ctx: StateContext<PublicStateModel>) {
    const userId = ctx.getState().userId;
    if (userId) {
      return this.cardRestService.privateCreate().pipe(
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
      return this.cardRestService.privateBook(action.id, action.emailConfirmation).pipe(
        tap(card => {
          ctx.setState(patch({cards: updateItem(c => c.id === card.id, card)}))
          const canBook = ctx.getState().cards.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
          ctx.patchState({canBook})
        })
      )
    }
    return
  }

  @Action(UnbookSlot)
  unbookSlot(ctx: StateContext<PublicStateModel>, action: UnbookSlot) {
    const userId = ctx.getState().userId;
    if (userId) {
      return this.cardRestService.privateDeleteSlot(action.cardId, action.slotId).pipe(
        tap(card => {
          ctx.setState(patch({cards: updateItem(c => c.id === card.id, card)}))
          const canBook = ctx.getState().cards.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
          ctx.patchState({canBook})
        })
      )
    }
    return
  }

  private buildProfile(user: User | null | undefined): UserProfile {
    const YOGA_NAMESPACE = 'https://www.yogaenpevele.fr/profile'
    let firstName = user?.[YOGA_NAMESPACE]?.first_name
    if (!firstName) {
      firstName = user?.given_name
    }
    let lastName = user?.[YOGA_NAMESPACE]?.last_name
    if (!lastName) {
      lastName = user?.family_name
    }
    let phone = user?.[YOGA_NAMESPACE]?.phone
    if (!phone) {
      lastName = user?.phone_number
    }
    return {firstName, lastName, phone, email: user?.email}
  }
}
