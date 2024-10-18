import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Hour {
  value: string;
  label: string;
  timestamp: string;
}

@Component({
  templateUrl: 'create-slot-dialog.html'
})
export class CreateSlotDialog {

  form: FormGroup
  hours: Hour[]

  constructor(
    private dialogRef: MatDialogRef<CreateSlotDialog>,
    fb: FormBuilder
  ) {
    this.hours = [
      {value: '10h00-11h15', label: '10H00 - 11H15', timestamp: '10:00:00'},
      {value: '19h00-20h15', label: '19H00 - 20H15', timestamp: '19:00:00'},
      {value: '19h15-20h30', label: '19H15 - 20H30', timestamp: '19:15:00'}
    ]
    this.form = fb.group({
      dateTime: fb.control(null, Validators.required),
      time: fb.control(null, Validators.required)
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      const hourSlot = this.hours.find(h => h.value = this.form.get('time')?.value);
      this.form.patchValue({dateTime: this.form.get('dateTime')?.value?.toISODate() + 'T' + hourSlot?.timestamp});
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
