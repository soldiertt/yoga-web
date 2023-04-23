import {NgModule} from '@angular/core';
import {SlotRestService} from './services/slot-rest-service';
import {environment} from '../../environments/environment';
import {CardRestService} from './services/card-rest-service';
import {UserRestService} from './services/user-rest-service';

@NgModule({
  imports: [

  ],
  providers: [
    CardRestService,
    SlotRestService,
    UserRestService,
    { provide: 'API_ENDPOINT', useValue: environment.apiEndpoint}
  ]
})
export class SharedRestModule {}
