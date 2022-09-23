import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '@components';
import { AuthService } from '@auth/services';
import { IRegister } from '@auth/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  public registerForm: FormGroup | undefined;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.registerForm?.valid) {
      const registerBody: IRegister = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.pw.password,
      };
      this._authService
        .register(registerBody)
        .pipe(takeUntil(this.unSubscribeOnDestroy))
        .subscribe({
          next: (v) => {
            this._router.navigate(['auth', 'sign-in']);
          },
        });
    }
  }

  private initForm(): void {
    this.registerForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      pw: this._fb.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        {
          validators: comparePassword,
        }
      ),
    });
  }
}

export function comparePassword(c: AbstractControl) {
  const { password, confirmPassword } = c.value;
  if (password !== confirmPassword) {
    c.get('confirmPassword')?.setErrors({ passwordNotMatch: true });
  }
  return null;
}
