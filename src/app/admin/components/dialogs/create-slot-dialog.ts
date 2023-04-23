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
    this.hours = [{value: '09h00-10h15', label: '09H00 - 10H15'}, {value: '10h30-11h45', label: '10H30 - 11H45'}, {value: '19h00-20h15', label: '19H00 - 20H15'}]
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
