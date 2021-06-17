import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permissions'
})
export class PermissionsPipe implements PipeTransform {

  transform(value:number, role:number): boolean {
    return value > role? false : true;
  }

}
