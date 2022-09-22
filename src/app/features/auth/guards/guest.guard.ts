import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { StorageHelper } from '@helpers';
import { StorageKeys } from '@enums';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private readonly _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let bearerToken = StorageHelper.getItem(StorageKeys.bearerToken);
    if (bearerToken) {
      this._router.navigate(['/', 'todo']);
      return false;
    }
    return true;
  }
}
