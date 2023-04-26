import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  templateUrl: 'standard-confirm-dialog.html'
})
export class StandardConfirmDialog {

  title: string;
  htmlContent: string;

  constructor(private dialogRef: MatDialogRef<StandardConfirmDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, htmlContent: string }) {
    this.title = data.title
    this.htmlContent = data.htmlContent
  }

  close(result?: string): void {
    this.dialogRef.close(result);
  }
}
