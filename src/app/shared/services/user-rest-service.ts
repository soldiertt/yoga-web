import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Card} from '../model/card';
import {Auth0User} from '../model/auth0-user';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserRestService {

  constructor(private http: HttpClient,  @Inject('API_ENDPOINT') private BASE_URL: string) {
  }
  manageFindByUserId(userId: string): Observable<Auth0User> {
    return this.http.get<Auth0User>(`${this.BASE_URL}/manage/${this.entityName()}/${userId}`)
  }

  private entityName(): string {
    return "users"
  }
}
