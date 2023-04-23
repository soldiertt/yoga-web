import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {Card} from '../model/card';

@Injectable()
export class CardRestService {

  constructor(private http: HttpClient,  @Inject('API_ENDPOINT') private BASE_URL: string) {
  }

  manageFindAll(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.BASE_URL}/manage/${this.entityName()}`)
  }
  manageUpdate(card: Partial<Card>): Observable<Card> {
    return this.http.patch<Card>(`${this.BASE_URL}/manage/${this.entityName()}/${card.id}`, card)
  }
  manageDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/manage/${this.entityName()}/${id}`)
  }
  privateCreate(userId: string): Observable<Card> {
    return this.http.post<Card>(`${this.BASE_URL}/private/${this.entityName()}`, {userId})
  }

  privateFindByUserId(userId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.BASE_URL}/private/${this.entityName()}/${userId}`)
  }

  private entityName(): string {
    return "cards"
  }
}
