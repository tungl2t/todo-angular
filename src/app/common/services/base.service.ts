import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IRequestUrl } from '@interfaces';
import { CommonHelper } from '@helpers';
import { environment } from '@env/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
  // @ts-ignore
  protected httpClient: HttpClient;
  protected snackBar: MatSnackBar | undefined;

  get(requestUrl: IRequestUrl | string) {
    return this.request(this.httpClient.get(this.getRequestUrl(requestUrl)));
  }

  post(requestUrl: IRequestUrl | string, body: any) {
    return this.request(this.httpClient.post(this.getRequestUrl(requestUrl), body));
  }

  put(requestUrl: IRequestUrl | string, body: any) {
    return this.request(this.httpClient.put(this.getRequestUrl(requestUrl), body));
  }

  delete(requestUrl: IRequestUrl | string) {
    return this.request(this.httpClient.delete(this.getRequestUrl(requestUrl)));
  }

  patch(requestUrl: IRequestUrl | string, body: any) {
    return this.request(this.httpClient.patch(this.getRequestUrl(requestUrl), body));
  }

  private request(observableReq: Observable<object>) {
    return observableReq.pipe(
      catchError((err) => {
        if (this.snackBar) {
          this.snackBar.open(err.error.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
        return throwError(err);
      })
    );
  }

  private getRequestUrl(requestUrl: IRequestUrl | string) {
    if (typeof requestUrl === 'string') {
      return this.urlJoin(environment.API_CORE, requestUrl);
    }
    const { url, params } = requestUrl;
    const replacedUrl = CommonHelper.convertTemplateStringWithObjectProperties(url, params);
    return this.urlJoin(environment.API_CORE, replacedUrl);
  }

  private urlJoin(...paths: string[]) {
    return paths.map((path) => (path[0] === '/' ? path.slice(1) : path)).join('/');
  }
}
