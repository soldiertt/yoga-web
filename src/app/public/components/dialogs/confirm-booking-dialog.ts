import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from '@auth0/auth0-angular';
import {PublicState} from '../../state/public-state';
import {UserProfile} from '../../../shared/model/user-profile';
import {Slot} from "../../../shared/model/slot";

@Component({
  templateUrl: 'confirm-booking-dialog.html'
})
export class ConfirmBookingDialog {

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
