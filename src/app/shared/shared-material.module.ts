import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_LUXON_DATE_FORMATS} from "@angular/material-luxon-adapter";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {StandardConfirmDialog} from "./components/standard-confirm-dialog";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    StandardConfirmDialog
  ],
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    StandardConfirmDialog
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ]
})
export class SharedMaterialModule {}
