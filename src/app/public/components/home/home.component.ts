import {Component, Inject, OnDestroy} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {DatePipe, DOCUMENT} from "@angular/common";
import {Select, Store} from '@ngxs/store';
import {Observable, takeUntil, Subject} from 'rxjs';
import {Card} from '../../../shared/model/card';
import {BookSlot, CreateCard, UnbookSlot} from '../../state/actions/card-actions';
import {Slot} from '../../../shared/model/slot';
import {LoadPublicState} from '../../state/actions/load-public-state';
import {PublicState} from '../../state/public-state';
import {StandardConfirmDialog} from '../../../shared/components/standard-confirm-dialog';
import {MatDialog} from '@angular/material/dialog';
import {SaveProfile} from '../../state/actions/save-profile';
import {UserProfileDialog} from '../dialogs/user-profile-dialog';
import {UserProfile} from '../../../shared/model/user-profile';
import {ConfirmBookingDialog} from "../dialogs/confirm-booking-dialog";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  @Select(state => state.public.cards) cards$: Observable<Card[]>
  @Select(state => state.public.slots) slots$: Observable<Slot[]>
  @Select(state => state.public.canBook) canBook$: Observable<boolean>
  @Select(PublicState.bookedSlots) bookedSlots$: Observable<{card: Card, slot: Slot}[]>
  @Select(PublicState.profileComplete) profileComplete$: Observable<boolean>
  @Select(state => state.public.profile) userProfile$: Observable<UserProfile>

  bookedSlots: {card: Card, slot: Slot}[]
  private readonly destroy$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) public document: Document,
              private dialog: MatDialog,
              public auth: AuthService,
              private store: Store,
              private datePipe: DatePipe) {
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

  openProfileDialog(profile: UserProfile, $event?): void {
    if ($event) {
      $event.preventDefault()
    }
    const dialogConfig = {data: {profile}}
    const dialogRef = this.dialog.open(UserProfileDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new SaveProfile(result))
      }
    });
  }

  orderCard(): void {
    const dialogConfig = {data: {
        title: 'Commander une carte',
        htmlContent: `<p>Vous êtes sur le point de commander une nouvelle carte pour 10 séances de Yoga.</p>
                <p>Prix: 120€</p>
                <p>Après avoir commandé cette carte, veuillez payer le montant à l'aide d'un virement bancaire
                avec les références suivantes:</p>
                <p>
                    Nom: Yoga En Pévèle<br/>
                    N° de compte : FR4545 4545 4512 2585<br/>
                    Communication: Votre nom + prénom
                </p>
                <p>Votre demande sera traitée dès que possible, après réception du paiement (compter 3 jours ouvrables),
                vous serez alors en mesure de faire vos réservations de séances en ligne.</p>
                `
      }}
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateCard())
      }
    });
  }

  getBookedSlot(slotId: number): {card: Card, slot: Slot} | undefined {
    return this.bookedSlots.find(bs => bs.slot.id === slotId)
  }

  getBookedSlotsCount(cardId: number): number {
    return this.bookedSlots.filter(bs => bs.card.id === cardId).length;
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
