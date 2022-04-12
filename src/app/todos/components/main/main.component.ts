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

  constructor(private todosService: TodosService) {
    this.visibleTodos$ = this.todosService.todos$.pipe(
      combineLatestWith(this.todosService.filter$),
      map(([todos, filter]: [Todo[], Filter]) => {
        console.log(todos, filter);
        
        return [];
      })
    );
  }

  ngOnInit(): void {}
}
