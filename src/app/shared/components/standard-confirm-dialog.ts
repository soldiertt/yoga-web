import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'standard-confirm-dialog.html'
})
export class StandardConfirmDialog {

  constructor(private dialogRef: MatDialogRef<StandardConfirmDialog>) {}

  close(result?: string): void {
    this.dialogRef.close(result);
  }
}
