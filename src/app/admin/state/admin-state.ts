import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {Slot} from '../../root/model/slot';
import {CreateSlot, DeleteCard, DeleteSlot, LoadAdminState, LoadSlotParticipants, ValidateCard} from './admin-actions';
import {SlotRestService} from '../../core/services/slot-rest-service';
import {combineLatest, tap} from 'rxjs';
import {append, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {CardRestService} from '../../core/services/card-rest-service';
import {Card} from '../../root/model/card';

interface AdminStateModel {
  slots: Slot[],
  cards: Card[],
  slotParticipants?: Card[]
}
@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    slots: [],
    cards: []
  }
})
@Injectable()
export class AdminState {


  constructor(private slotRestService: SlotRestService,
              private cardRestService: CardRestService) {
  }

  @Action(LoadAdminState)
  loadAdminState(ctx: StateContext<AdminStateModel>) {
    return combineLatest([this.slotRestService.manageFindAll(), this.cardRestService.manageFindAll()]).pipe(
      tap(([slots, cards]) => {
        ctx.patchState({
          slots, cards
        })
      })
    )
  }

  @Action(CreateSlot)
  createSlot(ctx: StateContext<AdminStateModel>, action: CreateSlot) {
    return this.slotRestService.manageCreate(action.slot).pipe(
      tap(slot => {
        ctx.setState(
          patch({
            slots: append([slot])
          })
        )
      })
    )
  }

  @Action(DeleteSlot)
  deleteSlot(ctx: StateContext<AdminStateModel>, action: DeleteSlot) {
    return this.slotRestService.manageDelete(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch({
            slots: removeItem(slot => slot.id === action.id)
          })
        )
      })
    )
  }

  @Action(LoadSlotParticipants)
  loadSlotParticipants(ctx: StateContext<AdminStateModel>, action: LoadSlotParticipants) {
    return this.cardRestService.manageFindAllBySlot(action.id).pipe(
      tap(cards => {
        ctx.patchState({slotParticipants: cards})
      })
    )
  }
  @Action(ValidateCard)
  validateCard(ctx: StateContext<AdminStateModel>, action: ValidateCard) {
    return this.cardRestService.manageUpdate({id: action.id, status: 'ACTIVE'}).pipe(
      tap(updatedCard => {
        ctx.setState(
          patch({
            cards: updateItem(card => card.id === updatedCard.id, updatedCard)
          })
        )
      })
    )
  }

  @Action(DeleteCard)
  deleteCard(ctx: StateContext<AdminStateModel>, action: DeleteCard) {
    return this.cardRestService.manageDelete(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch({
            cards: removeItem(card => card.id === action.id)
          })
        )
      })
    )
  }
}
