import {Component, Inject, Input} from '@angular/core';
import {YogaUser} from '../../../root/model/yoga-user';
import {UserProfileDialog} from '../dialogs/user-profile-dialog';
import {SaveProfile} from '../../state/actions/save-profile';
import {AuthService} from '@auth0/auth0-angular';
import {MatDialog} from '@angular/material/dialog';
import {Select, Store} from '@ngxs/store';
import {DOCUMENT} from '@angular/common';
import {PublicState} from '../../state/public-state';
import {Observable} from 'rxjs';
import {Card} from '../../../root/model/card';
import {Slot} from '../../../root/model/slot';

@Component({
  selector: 'yog-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  @Select(PublicState.profileComplete) profileComplete$: Observable<boolean>
  @Input() user: YogaUser
  @Input() bookedSlots: {card: Card, slot: Slot}[]

  constructor(@Inject(DOCUMENT) public document: Document,
              public auth: AuthService,
              private dialog: MatDialog,
              private store: Store,) {
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

}
