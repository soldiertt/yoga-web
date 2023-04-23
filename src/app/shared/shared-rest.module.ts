import {NgModule} from '@angular/core';
import {SlotRestService} from './services/slot-rest-service';
import {environment} from '../../environments/environment';
import {CardRestService} from './services/card-rest-service';

@NgModule({
  imports: [

  ],
  providers: [
    CardRestService,
    SlotRestService,
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint}
  ]
})
export class SharedRestModule {}
