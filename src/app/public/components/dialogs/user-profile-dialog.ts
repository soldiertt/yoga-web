import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {Auth0User} from '../../../shared/model/auth0-user';
import {User} from '@auth0/auth0-angular';
import {PublicState} from '../../state/public-state';

interface Hour {
  value: string;
  label: string;
}

@Component({
  templateUrl: 'user-profile-dialog.html'
})
export class UserProfileDialog {

  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<UserProfileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: fb.control(data.user[PublicState.YOGA_NAMESPACE]?.first_name, Validators.required),
      lastName: fb.control(data.user[PublicState.YOGA_NAMESPACE]?.last_name, Validators.required),
      phone: fb.control(data.user[PublicState.YOGA_NAMESPACE]?.phone, Validators.required)
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
