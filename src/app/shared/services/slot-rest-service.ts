import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Slot} from '../model/slot';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class SlotRestService {

  constructor(private http: HttpClient,  @Inject('API_ENDPOINT') private BASE_URL: string) {
  }

  manageFindAll(): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.BASE_URL}/manage/${this.entityName()}`)
  }

  manageCreate(entity: Slot): Observable<Slot> {
    return this.http.post<Slot>(`${this.BASE_URL}/manage/${this.entityName()}`, entity)
  }

  manageDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/manage/${this.entityName()}/${id}`)
  }

  private entityName(): string {
    return "slots"
  }
}
