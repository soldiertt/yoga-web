import {NgModule} from '@angular/core';
import {AdminHeaderComponent} from './components/header/admin-header.component';
import {AdminSlotsComponent} from './components/slots/admin-slots.component';
import {AdminRootComponent} from './components/root/admin-root.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {SharedMaterialModule} from '../shared/shared-material.module';
import {NgxsModule} from '@ngxs/store';
import {AdminState} from './state/admin-state';
import {SharedRestModule} from '../shared/shared-rest.module';

@NgModule({
  declarations: [
    AdminRootComponent,
    AdminHeaderComponent,
    AdminSlotsComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    NgxsModule.forFeature([AdminState]),
    SharedMaterialModule,
    SharedRestModule
  ]
})
export class AdminModule {

}
