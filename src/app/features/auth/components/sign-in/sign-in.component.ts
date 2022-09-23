import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@components';
import { AuthService } from '@auth/services';
import { StorageHelper } from '@helpers';
import { StorageKeys } from '@enums';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends BaseComponent implements OnInit {
  public loginForm: FormGroup | undefined;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      this._authService
        .login(this.loginForm?.value)
        .pipe(takeUntil(this.unSubscribeOnDestroy))
        .subscribe({
          next: (v) => {
            StorageHelper.setItem(StorageKeys.bearerToken, v.data?.accessToken);
            StorageHelper.setItem(StorageKeys.refreshToken, v.data?.refreshToken);
            StorageHelper.setItem(StorageKeys.userEmail, this.loginForm?.value.email);
            this._router.navigate(['todo']);
          },
        });
    }
  }

  private initForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
