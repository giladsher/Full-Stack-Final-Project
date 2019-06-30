import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Product[], args?: any): any {
    return value.filter(product => product.description.toLowerCase().includes(args.toLowerCase()));
  }

}
