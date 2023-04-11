import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SlotRestService} from './services/slot-rest-service';
import {environment} from '../../environments/environment';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    SlotRestService,
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint},
  ]
})
export class SharedRestModule {}
