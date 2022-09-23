import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, takeUntil } from 'rxjs';

import { StorageHelper } from '@helpers';
import { BaseComponent } from '@components';
import { TodoService } from '@todo/services';
import { ITodo } from '@todo/interfaces';
import { AddTodoComponent } from '@todo/components';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent extends BaseComponent implements OnInit {
  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  constructor(
    private readonly _todoService: TodoService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListTodos();
  }

  onCheck(todo: ITodo): void {
    if (!todo.completed) {
      this._todoService
        .setCompletedTodo(todo.id)
        .pipe(takeUntil(this.unSubscribeOnDestroy))
        .subscribe({
          next: (v) => {
            this.getListTodos();
          },
        });
    }
  }

  onAddTodo() {
    const dialogRef = this._dialog.open(AddTodoComponent, {
      disableClose: true,
      hasBackdrop: true,
      minWidth: 200,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this._todoService
            .createTodo(v)
            .pipe(takeUntil(this.unSubscribeOnDestroy))
            .subscribe({
              next: (result) => this.getListTodos(),
            });
        }
      },
    });
  }

  logout(): void {
    StorageHelper.clear();
    this._router.navigate(['auth', 'sign-in']);
  }

  todoTrackBy(index: number, todo: ITodo): number {
    return todo.id;
  }

  private getListTodos(): void {
    this._todoService
      .getListTodos()
      .pipe(takeUntil(this.unSubscribeOnDestroy))
      .subscribe({
        next: (value) => this.todos$.next(value),
      });
  }
}
