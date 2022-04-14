import { Component, OnInit } from '@angular/core';
import { combineLatestWith, map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { Filter } from '../../types/filter';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<Todo[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = this.todosService.todos$.pipe(
      combineLatestWith(this.todosService.filter$),
      map(([todos, filter]: [Todo[], Filter]) => {
        if (filter === Filter.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === Filter.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  ngOnInit(): void {}

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId
  }
}
