import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

import { TodoComponent } from './components';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [TodoComponent],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'todo' }],
  imports: [CommonModule, TodoRoutingModule, TranslocoModule],
})
export class TodoModule {}
