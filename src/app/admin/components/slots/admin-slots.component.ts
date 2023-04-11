import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Slot} from '../../../shared/model/slot';

@Component({
  templateUrl: './admin-slots.component.html'
})
export class AdminSlotsComponent {

  @Select(state => state.admin.slots) slots$: Observable<Slot[]>

}
