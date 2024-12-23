import {Component, Input} from '@angular/core';
import {Card} from '../../../root/model/card';
import {Slot} from '../../../root/model/slot';
import {StandardConfirmDialog} from '../../../shared/components/standard-confirm-dialog';
import {CreateCardLong, CreateCardShort} from '../../state/actions/card-actions';
import {MatDialog} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {PublicState} from '../../state/public-state';
import {Observable} from 'rxjs';

@Component({
  selector: 'yog-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent {

  @Select(PublicState.singleCardIsFull) singleCardIsFull$: Observable<boolean>
  @Input() cards: Card[] | undefined
  @Input() bookedSlots: {card: Card, slot: Slot}[]

  constructor(private dialog: MatDialog,
              private store: Store) {
  }

  getBookedSlotsCount(cardId: number): number {
    return this.bookedSlots?.filter(bs => bs.card.id === cardId).length;
  }

  orderCardLong(): void {
    const dialogConfig = {
      data: {
        title: 'Commander une carte',
        htmlContent: `<p>Vous êtes sur le point de commander une nouvelle carte pour 10 séances de Yoga. Prix: 150€, validité: 1 an.</p>
                <p>Confirmez ?</p>
                `
      }
    }
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateCardLong())
      }
    });
  }

  orderCardShort(): void {
    const dialogConfig = {
      data: {
        title: 'Commander une carte',
        htmlContent: `<p>Vous êtes sur le point de commander une nouvelle carte pour 10 séances de Yoga. Prix: 135€, validité: 3 avril 2025.</p>
                <p>Confirmez ?</p>
                `
      }
    }
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateCardShort())
      }
    });
  }

}
