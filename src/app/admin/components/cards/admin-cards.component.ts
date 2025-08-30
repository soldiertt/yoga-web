import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {StandardConfirmDialog} from "../../../shared/components/standard-confirm-dialog";
import {Card} from '../../../root/model/card';
import {DeleteCard, ToggleActiveCards, ValidateCard} from '../../state/admin-actions';

@Component({
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.scss']
})
export class AdminCardsComponent {

  @Select(state => state.admin.cards) cards$: Observable<Card[]>
  displayedColumns: string[] = ['user', 'cardId', 'price', 'status', 'createdTime', 'expirationTime', 'actions']

  constructor(private dialog: MatDialog, private store: Store) {
  }

  validate(id: number): void {
    this.store.dispatch(new ValidateCard(id))
  }

  deleteDialog(id: number) : void {
    const dialogConfig = {data: {title: 'Supprimer une carte', htmlContent: 'Etes-vous sûr de vouloir supprimer cette carte ?'}}
    const dialogRef = this.dialog.open(StandardConfirmDialog, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCard(id))
      }
    });
  }

  toggleActiveCards(checked: boolean) : void {
    this.store.dispatch(new ToggleActiveCards(checked))
  }
}
