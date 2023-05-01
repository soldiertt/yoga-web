import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {YogaUser} from "../../../root/model/yoga-user";

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
    @Inject(MAT_DIALOG_DATA) public data: { user: YogaUser },
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: fb.control(data.user.email, Validators.required),
      firstName: fb.control(data.user.firstName, Validators.required),
      lastName: fb.control(data.user.lastName, Validators.required),
      phone: fb.control(data.user.phone, Validators.required)
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
