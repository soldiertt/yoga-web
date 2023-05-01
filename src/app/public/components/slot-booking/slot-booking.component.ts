import {Component, Input} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Slot} from '../../../root/model/slot';
import {Card} from '../../../root/model/card';
import {ConfirmBookingDialog} from '../dialogs/confirm-booking-dialog';
import {BookSlot, UnbookSlot} from '../../state/actions/card-actions';
import {StandardConfirmDialog} from '../../../shared/components/standard-confirm-dialog';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {PublicState} from '../../state/public-state';

@Component({
  selector: 'yog-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.scss']
})
export class SlotBookingComponent {
  @Select(state => state.public.publicSlots) publicSlots$: Observable<Slot[]>
  @Select(PublicState.canBook) canBook$: Observable<boolean>
  @Input() bookedSlots: {card: Card, slot: Slot}[]


  constructor(private dialog: MatDialog, private store: Store, private datePipe: DatePipe) {
  }

  getBookedSlot(slotId: number): {card: Card, slot: Slot} | undefined {
    return this.bookedSlots?.find(bs => bs.slot.id === slotId)
  }

  bookSlot(slot: Slot): void {
    const dialogRef = this.dialog.open(ConfirmBookingDialog, {data: {slot}})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new BookSlot(slot.id, result.emailConfirmation))
      }
    });
  }

  unbookSlot({card, slot} : {card: Card, slot: Slot}): void {
    const dialogConfig = {data: {
        title: 'Annuler une séance',
        htmlContent: `Etes-vous sûr de vouloir annuler la réservation de la séance du ${this.datePipe.transform(slot.courseDate)}, tranche horaire ${slot.courseTime} ?`
      }}
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new UnbookSlot(card.id, slot.id))
      }
    })
  }

  bookButtonTooltip(canBook: boolean | null) {
    return canBook ? 'Réserver cette séance' :
      'Vous ne pouvez pas réserver à ce stade, vérifier que vous êtes connecté et que vous disposez d\'une carte active'
  }

}
