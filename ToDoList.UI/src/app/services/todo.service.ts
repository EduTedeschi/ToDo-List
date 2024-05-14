import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseApiUrl: string = "https://localhost:7054";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.baseApiUrl + '/api/ToDo')
  }

  addToDo(newTodo: ToDo): Observable<ToDo> {
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<ToDo>(this.baseApiUrl + '/api/ToDo', newTodo)
  }

  updateToDo(id: string, todo: ToDo): Observable<ToDo>{
    return this.http.put<ToDo>(this.baseApiUrl + '/api/ToDo/' + id, todo)
  }

  deleteToDo(id: string): Observable<ToDo>{
    return this.http.delete<ToDo>(this.baseApiUrl + '/api/ToDo/' + id)
  }
}
