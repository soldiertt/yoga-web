import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Slot} from '../../../root/model/slot';
import {MatDialog} from "@angular/material/dialog";
import {CreateSlotDialog} from "../dialogs/create-slot-dialog";
import {CreateSlot, DeleteSlot} from "../../state/admin-actions";
import {StandardConfirmDialog} from "../../../shared/components/standard-confirm-dialog";
import {DateTime} from 'luxon';

@Component({
  templateUrl: './admin-slots.component.html',
  styleUrls: ['./admin-slots.component.scss']
})
export class AdminSlotsComponent {

  @Select(state => state.admin.slots) slots$: Observable<Slot[]>

  constructor(private dialog: MatDialog, private store: Store) {
  }

  createDialog() : void {
    const dialogRef = this.dialog.open(CreateSlotDialog)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const courseDate = result.date.toISODate()
        this.store.dispatch(new CreateSlot({courseDate, courseTime: result.time}))
      }
    });
  }

  isFuture(slot: Slot): boolean {
    return DateTime.fromFormat(slot.courseDate, 'yyyy-MM-dd') >= DateTime.now()
  }

  deleteDialog(id: number, $event?) : void {
    if ($event) {
      $event.stopPropagation()
    }
    const dialogConfig = {data: {title: 'Supprimer une séance', htmlContent: 'Etes-vous sûr de vouloir supprimer cette séance ?'}}
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteSlot(id))
      }
    });
  }

}
