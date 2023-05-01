import {Component, Input} from '@angular/core';
import {Card} from '../../../root/model/card';
import {Slot} from '../../../root/model/slot';

@Component({
  selector: 'yog-my-carts',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent {

  @Input() cards: Card[] | undefined
  @Input() bookedSlots: {card: Card, slot: Slot}[]

  getBookedSlotsCount(cardId: number): number {
    return this.bookedSlots?.filter(bs => bs.card.id === cardId).length;
  }
}
