import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number | null, trace?: boolean): string {
    if (trace && (value === 0 || value === null)) {
      return '-';
    } else {
      return value + '%';
    }
  }

}
