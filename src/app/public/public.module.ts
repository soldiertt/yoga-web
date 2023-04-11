import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {PublicRoutingModule} from './public-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule {}
