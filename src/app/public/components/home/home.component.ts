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

  bookedSlots: { card: Card, slot: Slot }[]
  private readonly destroy$ = new Subject<void>();

  constructor(private store: Store,
              public auth: AuthService) {
    this.store.dispatch(new LoadPublicState())
    this.bookedSlots$.pipe(takeUntil(this.destroy$))
      .subscribe(
        (bookedSlots) => {
          this.bookedSlots = bookedSlots
        }
      )
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe(bool => {
      if (bool) {
        this.store.dispatch(new Authentication())
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
