import {NgModule} from '@angular/core';
import {CardIdPipe} from './pipes/card-id-pipe';
import {StandardConfirmDialog} from './components/standard-confirm-dialog';
import {StandardSimpleDialog} from './components/standard-simple-dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule, DatePipe} from '@angular/common';
import {CardStatusPipe} from './pipes/card-status-pipe';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CardIdPipe,
    CardStatusPipe,
    StandardConfirmDialog,
    StandardSimpleDialog
  ],
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ],
  exports: [
    CardIdPipe,
    CardStatusPipe,
    CommonModule,
    ReactiveFormsModule,
    StandardConfirmDialog,
    StandardSimpleDialog
  ]
})
export class SharedUtilModule {}
