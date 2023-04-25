import {Component, Inject, OnDestroy} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {Select, Store} from '@ngxs/store';
import {Observable, combineLatest, takeUntil, Subject} from 'rxjs';
import {Card} from '../../../shared/model/card';
import {BookSlot, CreateCard, UnbookSlot} from '../../state/actions/card-actions';
import {Slot} from '../../../shared/model/slot';
import {LoadPublicState} from '../../state/actions/load-public-state';
import {PublicState} from '../../state/public-state';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  @Select(state => state.public.cards) cards$: Observable<Card[]>
  @Select(state => state.public.slots) slots$: Observable<Slot[]>
  @Select(state => state.public.canBook) canBook$: Observable<boolean>
  @Select(PublicState.bookedSlots) bookedSlots$: Observable<{card: Card, slot: Slot}[]>
  bookedSlots: {card: Card, slot: Slot}[]
  private readonly destroy$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) public document: Document,
              public auth: AuthService,
              public store: Store) {
    this.store.dispatch(new LoadPublicState())
    this.bookedSlots$.pipe(takeUntil(this.destroy$))
      .subscribe(
      (bookedSlots) => {
        this.bookedSlots = bookedSlots
      }
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  orderCard(): void {
    this.store.dispatch(new CreateCard())
  }

  getBookedSlot(slotId: number): {card: Card, slot: Slot} | undefined {
    return this.bookedSlots.find(bs => bs.slot.id === slotId)
  }

  getBookedSlotsCount(cardId: number): number {
    return this.bookedSlots.filter(bs => bs.card.id === cardId).length;
  }

  bookSlot(id: number): void {
    this.store.dispatch(new BookSlot(id))
  }

  unbookSlot({card, slot} : {card: Card, slot: Slot}): void {
    this.store.dispatch(new UnbookSlot(card.id, slot.id))
  }
}
