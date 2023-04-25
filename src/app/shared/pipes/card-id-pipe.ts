import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cardId'})
export class CardIdPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string | undefined {
    if (!value) {
      return undefined;
    }
    const s = "card0000" + value;
    return s.substring(s.length - 9);
  }

}
