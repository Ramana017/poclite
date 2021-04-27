import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domsanitize'
})
export class DomsanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

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

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum) {
    // rawNum = rawNum.charAt(0) != 0 ? "0" + rawNum : "" + rawNum;

    // let newStr = "";
    // let i = 0;

    // for (; i < Math.floor(rawNum.length / 2) - 1; i++) {
    //   newStr = newStr + rawNum.substr(i * 2, 2) + "-";
    // }
    console.log(rawNum)
    if (rawNum != undefined) {
      let trimmed = rawNum?.replace(/\s+/g, '');

      trimmed = trimmed?.replace(/-/g, '');
      let numbers = [];
      numbers.push(trimmed.substr(0, 3));
      if (trimmed.substr(3, 2) !== "")
        numbers.push(trimmed.substr(3, 3));
      if (trimmed.substr(5, 4) != "" && trimmed.length >= 7)
        numbers.push(trimmed.substr(6, 4));

      return numbers.join('-');
    }
  }
}
