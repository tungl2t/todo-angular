import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { AuthComponent, RegisterComponent, SignInComponent } from './components';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AuthComponent, SignInComponent, RegisterComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'auth' }],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
