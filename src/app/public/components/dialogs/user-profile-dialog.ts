import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from '@auth0/auth0-angular';
import {PublicState} from '../../state/public-state';
import {UserProfile} from '../../../root/model/user-profile';

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
    @Inject(MAT_DIALOG_DATA) public data: { profile: UserProfile },
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: fb.control(data.profile.email, Validators.required),
      firstName: fb.control(data.profile.firstName, Validators.required),
      lastName: fb.control(data.profile.lastName, Validators.required),
      phone: fb.control(data.profile.phone, Validators.required)
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
