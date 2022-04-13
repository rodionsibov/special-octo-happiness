import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../types/filter';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<Filter>(Filter.all);

  constructor() {}

  addTodo(text: string): void {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: Filter): void {
    this.filter$.next(filterName);
  }
}
