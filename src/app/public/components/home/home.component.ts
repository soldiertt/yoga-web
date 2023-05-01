import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, takeUntil} from 'rxjs';
import {Card} from '../../../root/model/card';
import {CreateCard} from '../../state/actions/card-actions';
import {Slot} from '../../../root/model/slot';
import {LoadPublicState} from '../../state/actions/load-public-state';
import {PublicState} from '../../state/public-state';
import {StandardConfirmDialog} from '../../../shared/components/standard-confirm-dialog';
import {MatDialog} from '@angular/material/dialog';
import {SaveProfile} from '../../state/actions/save-profile';
import {UserProfileDialog} from '../dialogs/user-profile-dialog';
import {YogaUser} from '../../../root/model/yoga-user';
import {Authentication} from '../../state/actions/authentication';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @Select(state => state.public.user) yogaUser$: Observable<YogaUser>
  @Select(PublicState.bookedSlots) bookedSlots$: Observable<{ card: Card, slot: Slot }[]>
  @Select(PublicState.profileComplete) profileComplete$: Observable<boolean>
  @Select(PublicState.singleCardIsFull) singleCardIsFull$: Observable<boolean>

  bookedSlots: { card: Card, slot: Slot }[]
  private readonly destroy$ = new Subject<void>();

  constructor(@Inject(DOCUMENT) public document: Document,
              private dialog: MatDialog,
              public auth: AuthService,
              private store: Store) {
    this.store.dispatch(new LoadPublicState())
    this.bookedSlots$.pipe(takeUntil(this.destroy$))
      .subscribe(
        (bookedSlots) => {
          this.bookedSlots = bookedSlots
        }
      )
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(bool => {
      if (bool) {
        this.store.dispatch(new Authentication())
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openProfileDialog(user: YogaUser, $event?): void {
    if ($event) {
      $event.preventDefault()
    }
    const dialogConfig = {data: {user}}
    const dialogRef = this.dialog.open(UserProfileDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new SaveProfile(result))
      }
    });
  }

  orderCard(): void {
    const dialogConfig = {
      data: {
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
      }
    }
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new CreateCard())
      }
    });
  }

  getBookedSlotsCount(cardId: number): number {
    return this.bookedSlots?.filter(bs => bs.card.id === cardId).length;
  }

}
