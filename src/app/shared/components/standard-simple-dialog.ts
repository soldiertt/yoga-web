import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'standard-simple-dialog.html'
})
export class StandardSimpleDialog {

  constructor(private dialogRef: MatDialogRef<StandardSimpleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { content: string }) {
  }

  close(result?: string): void {
    this.dialogRef.close(result);
  }
}
