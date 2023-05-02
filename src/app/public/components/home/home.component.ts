import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Select, Store} from '@ngxs/store';
import {Observable, Subject, takeUntil} from 'rxjs';
import {Card} from '../../../root/model/card';
import {Slot} from '../../../root/model/slot';
import {LoadPublicState} from '../../state/actions/load-public-state';
import {PublicState} from '../../state/public-state';
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
