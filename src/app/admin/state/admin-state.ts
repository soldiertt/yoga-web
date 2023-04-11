import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {Slot} from '../../shared/model/slot';
import {LoadAdminState} from './admin-actions';
import {SlotRestService} from '../../shared/services/slot-rest-service';
import {tap} from 'rxjs';

interface AdminStateModel {
  slots: Slot[]
}
@State<AdminStateModel>({
  name: 'admin',
  defaults: {
    slots: []
  }
})
@Injectable()
export class AdminState {


  constructor(private slotRestservice: SlotRestService) {
  }

  @Action(LoadAdminState)
  loadAdminstate(ctx: StateContext<AdminStateModel>) {
    return this.slotRestservice.findAll().pipe(
      tap(slots => {
        ctx.patchState({
          slots
        })
      })
    )
  }
}
