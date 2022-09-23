import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageKeys } from '@enums';
import { StorageHelper } from '@helpers';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let bearerToken = StorageHelper.getItem(StorageKeys.bearerToken);
    if (!!bearerToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
