import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {

  transform(value:number | number[], role:number): boolean {
    if(typeof value === "number") {
      return value <= role? true : false;
    } else {
     const x= value.some(val => val === role )
      return x
      // return value.some(val => val <= role )
    }

  }

}
