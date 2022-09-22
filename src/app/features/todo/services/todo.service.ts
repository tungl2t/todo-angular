import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseService } from '@services';
import { TodoApiPath } from '@enums';
import { IResponse } from '@interfaces';
import { ITodo } from '@todo/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends BaseService {
  constructor(private readonly _httpClient: HttpClient) {
    super();
    this.httpClient = _httpClient;
  }

  getListTodos(): Observable<IResponse<ITodo>> {
    return this.get(TodoApiPath.todos) as Observable<IResponse<ITodo>>;
  }
}
