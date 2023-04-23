import {NgModule} from '@angular/core';
import {AdminHeaderComponent} from './components/header/admin-header.component';
import {AdminSlotsComponent} from './components/slots/admin-slots.component';
import {AdminRootComponent} from './components/root/admin-root.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SharedMaterialModule} from '../shared/shared-material.module';
import {NgxsModule} from '@ngxs/store';
import {AdminState} from './state/admin-state';
import {SharedRestModule} from '../shared/shared-rest.module';
import {CreateSlotDialog} from "./components/dialogs/create-slot-dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatLuxonDateModule} from "@angular/material-luxon-adapter";
import {SortSlotsPipe} from "./components/pipes/sort-slots-pipe";
import {AdminCardsComponent} from './components/cards/admin-cards.component';

@NgModule({
  declarations: [
    AdminCardsComponent,
    AdminRootComponent,
    AdminHeaderComponent,
    AdminSlotsComponent,
    CreateSlotDialog,
    SortSlotsPipe
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatLuxonDateModule,
    NgxsModule.forFeature([AdminState]),
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedRestModule,
    NgOptimizedImage
  ]
})
export class AdminModule {

}
