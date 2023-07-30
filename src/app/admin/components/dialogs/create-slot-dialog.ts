import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

interface Hour {
  value: string;
  label: string;
}

@Component({
  templateUrl: 'create-slot-dialog.html'
})
export class CreateSlotDialog {

  form: FormGroup
  hours: Hour[]

  constructor(
    private dialogRef: MatDialogRef<CreateSlotDialog>,
    private fb: FormBuilder
  ) {
    this.hours = [{value: '10h00-11h15', label: '10H00 - 11H15'}, {value: '19h00-20h15', label: '19H00 - 20H15'}]
    this.form = fb.group({
      date: fb.control(null, Validators.required),
      time: fb.control(null, Validators.required)
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
