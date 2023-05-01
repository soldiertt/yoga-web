import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {PublicRoutingModule} from './public-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NgxsModule} from '@ngxs/store';
import {PublicState} from './state/public-state';
import {SharedMaterialModule} from '../shared/shared-material.module';
import {SharedUtilModule} from '../shared/shared-util.module';
import {UserProfileDialog} from './components/dialogs/user-profile-dialog';
import {ConfirmBookingDialog} from "./components/dialogs/confirm-booking-dialog";
import {SlotBookingComponent} from "./components/slot-booking/slot-booking.component";

@NgModule({
  declarations: [
    ConfirmBookingDialog,
    HomeComponent,
    SlotBookingComponent,
    UserProfileDialog
  ],
  imports: [
    PublicRoutingModule,
    MatButtonModule,
    MatMenuModule,
    NgxsModule.forFeature([PublicState]),
    SharedMaterialModule,
    SharedUtilModule
  ]
})
export class PublicModule {}
