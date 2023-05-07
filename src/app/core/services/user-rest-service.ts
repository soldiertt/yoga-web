import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {YogaUser} from "../../root/model/yoga-user";

@Injectable()
export class UserRestService {

  constructor(private http: HttpClient,  @Inject('API_ENDPOINT') private BASE_URL: string) {
  }

  privateAuthentify(): Observable<YogaUser> {
    return this.http.get<YogaUser>(`${this.BASE_URL}/private/${this.entityName()}`);
  }

  privateUpdateProfile(user: Partial<YogaUser>): Observable<YogaUser> {
    return this.http.patch<YogaUser>(`${this.BASE_URL}/private/${this.entityName()}`, user);
  }

  private entityName(): string {
    return "users"
  }
}
