import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { BaseService } from '@services';
import { TodoApiPath } from '@enums';
import { IResponse } from '@interfaces';
import { ICreateTodo, ITodo } from '@todo/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends BaseService {
  constructor(private readonly _httpClient: HttpClient) {
    super();
    this.httpClient = _httpClient;
  }

  getListTodos(): Observable<ITodo[]> {
    return this.get(TodoApiPath.todos).pipe(map((res: any) => res.data)) as Observable<ITodo[]>;
  }

  createTodo(createTodo: ICreateTodo): Observable<IResponse<ITodo>> {
    return this.post(TodoApiPath.todos, createTodo) as Observable<IResponse<ITodo>>;
  }

  setCompletedTodo(todoId: number): Observable<IResponse<ITodo>> {
    return this.patch({ path: TodoApiPath.todo, params: { todoId } }) as Observable<IResponse<ITodo>>;
  }
}
