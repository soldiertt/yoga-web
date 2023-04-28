import {HttpClient, HttpParams} from '@angular/common/http';
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

  manageFindAllBySlot(slotId: number): Observable<Card[]> {
    let params = new HttpParams()
    params = params.set('slotId', slotId)
    return this.http.get<Card[]>(`${this.BASE_URL}/manage/${this.entityName()}`, {params})
  }

  manageUpdate(card: Partial<Card>): Observable<Card> {
    return this.http.patch<Card>(`${this.BASE_URL}/manage/${this.entityName()}/${card.id}`, card)
  }
  manageDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/manage/${this.entityName()}/${id}`)
  }
  privateCreate(): Observable<Card> {
    return this.http.post<Card>(`${this.BASE_URL}/private/${this.entityName()}`, {})
  }

  privateBook(slotId: number, emailConfirmation: boolean): Observable<Card> {
    return this.http.post<Card>(`${this.BASE_URL}/private/${this.entityName()}/slots`, {slotId, emailConfirmation})
  }

  privateDeleteSlot(cardId: number, slotId: number): Observable<Card> {
    return this.http.delete<Card>(`${this.BASE_URL}/private/${this.entityName()}/${cardId}/slots/${slotId}`)
  }

  privateFindByUserId(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.BASE_URL}/private/${this.entityName()}`)
  }

  private entityName(): string {
    return "cards"
  }
}
