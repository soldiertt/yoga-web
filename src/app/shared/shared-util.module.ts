import {NgModule} from '@angular/core';
import {CardIdPipe} from './pipes/card-id-pipe';
import {StandardConfirmDialog} from './components/standard-confirm-dialog';
import {StandardSimpleDialog} from './components/standard-simple-dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    CardIdPipe,
    StandardConfirmDialog,
    StandardSimpleDialog
  ],
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    CardIdPipe,
    StandardConfirmDialog,
    StandardSimpleDialog
  ]
})
export class SharedUtilModule {}
