import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { AddTodoComponent, HeaderBarComponent, TodoComponent } from './components';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [TodoComponent, HeaderBarComponent, AddTodoComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'todo' }],
  imports: [
    CommonModule,
    TodoRoutingModule,
    TranslocoModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class TodoModule {}
