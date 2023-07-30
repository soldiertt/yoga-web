import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Slot} from "../../../root/model/slot";
import {CANCEL_DEADLINE_HOURS} from '../../../core/parameters';

@Component({
  templateUrl: 'confirm-booking-dialog.html'
})
export class ConfirmBookingDialog {

  protected readonly CANCEL_DEADLINE_HOURS = CANCEL_DEADLINE_HOURS;
  form: FormGroup
  slot: Slot

  constructor(
    private dialogRef: MatDialogRef<ConfirmBookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { slot: Slot },
    private fb: FormBuilder
  ) {
    this.slot = data.slot
    this.form = fb.group({
      emailConfirmation: fb.control(true, Validators.required)
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
