import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {StandardConfirmDialog} from "../../../shared/components/standard-confirm-dialog";
import {Card} from '../../../shared/model/card';
import {DeleteCard, ValidateCard} from '../../state/admin-actions';
import {UserRestService} from '../../../shared/services/user-rest-service';
import {Auth0User} from '../../../shared/model/auth0-user';
import {StandardSimpleDialog} from '../../../shared/components/standard-simple-dialog';

@Component({
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.scss']
})
export class AdminCardsComponent {

  @Select(state => state.admin.cards) cards$: Observable<Card[]>
  displayedColumns: string[] = ['user', 'status', 'createdTime', 'actions']

  userTooltip: Auth0User;

  constructor(private dialog: MatDialog, private store: Store, private userRestService: UserRestService) {
  }

  validate(id: number): void {
    this.store.dispatch(new ValidateCard(id))
  }

  deleteDialog(id: number) : void {
    const dialogRef = this.dialog.open(StandardConfirmDialog)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCard(id))
      }
    });
  }

  userInfo(userId: string) {
    this.userRestService.manageFindByUserId(userId).subscribe(user => {
      this.dialog.open(StandardSimpleDialog, {
        data: {content: "<pre>" + JSON.stringify(user, null, 4) + "</pre>"},
      });
    })
  }
}
