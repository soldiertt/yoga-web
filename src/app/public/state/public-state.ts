import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {combineLatest, tap} from 'rxjs';
import {Authentication} from './actions/authentication';
import {CardRestService} from '../../core/services/card-rest-service';
import {BookSlot, CreateCard, UnbookSlot} from './actions/card-actions';
import {append, patch, updateItem} from '@ngxs/store/operators';
import {Slot} from '../../root/model/slot';
import {LoadPublicState} from './actions/load-public-state';
import {SlotRestService} from '../../core/services/slot-rest-service';
import {SaveProfile} from './actions/save-profile';
import {UserRestService} from '../../core/services/user-rest-service';
import {YogaUser} from "../../root/model/yoga-user";

interface PublicStateModel {
  user?: YogaUser;
  publicSlots: Slot[];
}
@State<PublicStateModel>({
  name: 'public',
  defaults: {
    publicSlots: []
  }
})
@Injectable()
export class PublicState {

  @Selector()
  static profileComplete(state: PublicStateModel): boolean {
    return !!state.user?.firstName && !!state.user?.lastName && !!state.user?.phone;
  }

  @Selector()
  static singleCardIsFull(state: PublicStateModel): boolean {
    const pendingCardsCount = state.user?.cards?.filter(card => card.status === 'PENDING').length
    const activeCardsCount = state.user?.cards?.filter(card => card.status === 'ACTIVE').length
    return pendingCardsCount === 0 && activeCardsCount === 1 && !!state.user?.cards?.some(card => card.status === 'ACTIVE' && card.capacity <= card.slots.length)
  }

  @Selector()
  static bookedSlots(state: PublicStateModel) {
    return state.user?.cards?.filter(c => c.slots)
      .flatMap(c =>
        c.slots.map(s => ({card: c, slot: s}))
      );
  }

  @Selector()
  static canBook(state: PublicStateModel) {
    return state.user?.cards?.some(c => c.status === 'ACTIVE' && c.slots.length < c.capacity);
  }

  constructor(private auth: AuthService,
              private userRestService: UserRestService,
              private slotRestService: SlotRestService,
              private cardRestService: CardRestService) {
  }

  @Action(LoadPublicState)
  loadPublicState(ctx: StateContext<PublicStateModel>) {
    return this.slotRestService.publicFindAll().pipe(
      tap(publicSlots => {
        ctx.patchState({publicSlots})
      })
    )
  }

  @Action(Authentication)
  authentication(ctx: StateContext<PublicStateModel>) {
    return combineLatest([this.userRestService.privateAuthentify(), this.auth.idTokenClaims$]).pipe(
      tap(([user, claims]) => {
        user.isAdmin = claims?.['https://www.yogaenpevele.fr/roles']?.includes('admin')
        ctx.patchState({user})
      })
    )

  }

  @Action(SaveProfile)
  saveProfile(ctx: StateContext<PublicStateModel>, action: SaveProfile) {
    return this.userRestService.privateUpdateProfile(action.user).pipe(
      tap(yogaUser => {
        ctx.setState(patch({user: yogaUser}))
      })
    )
  }

  @Action(CreateCard)
  createCardRequest(ctx: StateContext<PublicStateModel>) {
    const userId = ctx.getState().user?.userId;
    if (userId) {
      return this.cardRestService.privateCreate().pipe(
        tap(card => {
          ctx.setState(patch({user: patch({cards: append([card])})}))
        })
      )
    }
    return
  }

  @Action(BookSlot)
  bookSlot(ctx: StateContext<PublicStateModel>, action: BookSlot) {
    const userId = ctx.getState().user?.userId;
    if (userId) {
      return this.cardRestService.privateBook(action.id, action.emailConfirmation).pipe(
        tap(card => {
          ctx.setState(
            patch({user:
                patch({cards:
                    updateItem(c => c.id === card.id, card)
                })
            })
          )
        })
      )
    }
    return
  }

  @Action(UnbookSlot)
  unbookSlot(ctx: StateContext<PublicStateModel>, action: UnbookSlot) {
    const userId = ctx.getState().user?.userId;
    if (userId) {
      return this.cardRestService.privateDeleteSlot(action.cardId, action.slotId).pipe(
        tap(card => {
          ctx.setState(
            patch({user:
                patch({cards:
                    updateItem(c => c.id === card.id, card)
                })
            })
          )
        })
      )
    }
    return
  }

}
