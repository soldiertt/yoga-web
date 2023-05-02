import {Component, Input} from '@angular/core';
import {Card} from '../../../root/model/card';
import {Slot} from '../../../root/model/slot';
import {StandardConfirmDialog} from '../../../shared/components/standard-confirm-dialog';
import {CreateCard} from '../../state/actions/card-actions';
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

  orderCard(): void {
    const dialogConfig = {
      data: {
        title: 'Commander une carte',
        htmlContent: `<p>Vous êtes sur le point de commander une nouvelle carte pour 10 séances de Yoga. Prix: 120€</p>
                <p>Après avoir commandé cette carte, veuillez payer le montant à l'aide d'un virement bancaire
                avec les références suivantes:</p>
                <p>
                    Nom: <strong>Yoga En Pévèle</strong><br/>
                    N° de compte : <strong>FR4545 4545 4512 2585</strong><br/>
                    Communication: <strong>Votre nom + prénom</strong>
                </p>
                <p>Votre demande sera traitée dès que possible, après réception du paiement (compter 3 jours ouvrables),
                vous serez alors en mesure de faire vos réservations de séances en ligne.</p>
                `
      }
    }
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateCard())
      }
    });
  }

}
