import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public role;
  private roles = {
    'admin': 3,
    'maintainer': 2,
    'user' : 1
   }
  constructor() { }

  getRole(value) {
    this.role = this.roles[value]
    return this.role
  }
}
