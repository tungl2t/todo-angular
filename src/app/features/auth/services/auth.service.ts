import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { AuthApiPath } from '@enums';
import { BaseService } from '@services';
import { ILogin, ILoginResponse, IRefreshToken, IRegister, IRegisterResponse } from '@auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private readonly _httpBackend: HttpBackend, private readonly _snackbar: MatSnackBar) {
    super();
    this.httpClient = new HttpClient(_httpBackend);
    this.snackBar = _snackbar;
  }

  login(dto: ILogin): Observable<ILoginResponse> {
    return this.post(AuthApiPath.signIn, dto) as Observable<ILoginResponse>;
  }

  register(dto: IRegister): Observable<IRegisterResponse> {
    return this.post(AuthApiPath.register, dto) as Observable<IRegisterResponse>;
  }

  refreshToken(dto: IRefreshToken): Observable<ILoginResponse> {
    return this.post(AuthApiPath.refreshToken, dto) as Observable<ILoginResponse>;
  }
}
