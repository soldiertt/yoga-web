import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cardStatus'})
export class CardStatusPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string | undefined {
    if (!value) {
      return undefined;
    }
    switch (value) {
      case 'PENDING':
        return 'En attente'
      case 'ACTIVE':
        return 'Active'
      case 'EXPIRED':
        return 'Expirée'
      default:
        return 'Inconnu'
    }
  }

}
