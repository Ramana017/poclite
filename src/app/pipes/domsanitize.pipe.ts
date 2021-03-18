import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domsanitize'
})
export class DomsanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}



@Pipe({
  name: 'Itemfilter'
})
export class FilterPipe implements PipeTransform {
transform(items: any, filter: any, isAnd: boolean): any {
  if (filter && Array.isArray(items)) {
    let filterKeys = Object.keys(filter);
    if (isAnd) {
      return items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
              (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
    } else {
      return items.filter(item => {
        return filterKeys.some((keyName) => {
          // console.log(keyName);
          return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
        });
      });
    }
  } else {
    return items;
  }
}
}
