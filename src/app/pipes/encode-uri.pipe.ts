import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeUri'
})
export class EncodeUriPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('encodeUri: ', value);
    return value.replace(/'/g, '%27');
  }

}
