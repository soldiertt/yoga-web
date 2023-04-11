import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Slot} from '../model/slot';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class SlotRestService {

  constructor(private http: HttpClient,  @Inject('API_ENDPOINT') private BASE_URL: string) {
  }

  findAll(): Observable<Slot[]> {
    return this.http.get<Slot[]>(this.BASE_URL + "/slots")
  }
}
