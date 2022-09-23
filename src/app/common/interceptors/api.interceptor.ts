import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthService } from '@auth/services';
import { StorageHelper } from '@helpers';
import { StorageKeys } from '@enums';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private isFetchingRefreshToken = false;
  private accessTokenData$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          const userEmail = StorageHelper.getItem(StorageKeys.userEmail);
          const refreshToken = StorageHelper.getItem(StorageKeys.refreshToken);
          if (userEmail && refreshToken) {
            return this.handleRefreshToken(request, next, userEmail, refreshToken);
          } else {
            this.handleErrorResponse();
          }
        }
        return throwError(error);
      })
    );
  }

  private handleRefreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    userEmail: string,
    refreshToken: string
  ) {
    if (this.isFetchingRefreshToken) {
      return this.accessTokenData$.pipe(
        filter((accessToken) => !!accessToken),
        take(1),
        switchMap((token) => next.handle(this.normalizeRequestHeaders(request, token)))
      );
    } else {
      this.isFetchingRefreshToken = true;
      this.accessTokenData$.next('');
      return this._authService.refreshToken({ email: userEmail, refreshToken }).pipe(
        switchMap((res) => {
          this.isFetchingRefreshToken = false;
          if (res.data?.accessToken) {
            this.accessTokenData$.next(res.data.accessToken);
            StorageHelper.setItem(StorageKeys.bearerToken, res.data.accessToken);
            StorageHelper.setItem(StorageKeys.refreshToken, res.data.refreshToken);
            return next.handle(this.normalizeRequestHeaders(request, res.data.accessToken));
          } else {
            this.handleErrorResponse();
            return throwError(null);
          }
        }),
        catchError((e) => {
          this.handleErrorResponse();
          return throwError(e);
        })
      );
    }
  }

  private handleErrorResponse() {
    StorageHelper.clear();
    this._router.navigate(['auth']);
  }

  private normalizeRequestHeaders(request: HttpRequest<unknown>, accessToken: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
