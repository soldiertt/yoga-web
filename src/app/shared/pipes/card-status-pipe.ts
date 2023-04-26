import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cardStatus'})
export class CardStatusPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string | undefined {
    if (!value) {
      return undefined;
    }
    return value === 'PENDING' ? 'En attente' : value === 'ACTIVE' ? 'Active' : 'Inconnu'
  }

}
