import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {PublicRoutingModule} from './public-routing.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NgxsModule} from '@ngxs/store';
import {PublicState} from './state/public-state';
import {SharedRestModule} from '../shared/shared-rest.module';
import {SharedMaterialModule} from '../shared/shared-material.module';
import {SharedUtilModule} from '../shared/shared-util.module';
import {UserProfileDialog} from './components/dialogs/user-profile-dialog';

@NgModule({
  declarations: [
    HomeComponent,
    UserProfileDialog
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatButtonModule,
    MatMenuModule,
    NgxsModule.forFeature([PublicState]),
    SharedMaterialModule,
    SharedRestModule,
    SharedUtilModule
  ]
})
export class PublicModule {}
