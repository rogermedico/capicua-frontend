import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iban'
})
export class IbanPipe implements PipeTransform {

  transform(iban: string): string {
    return iban.replace(/(.{4})/g, '$1 ');
  }

}
