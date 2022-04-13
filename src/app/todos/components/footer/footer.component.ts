import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { Filter } from '../../types/filter';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<Filter>
  filterEnum = Filter;

  constructor(private todosService: TodosService) {
    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todosService.filter$
  }

  ngOnInit(): void {}

  changeFilter(event: Event, filterName: Filter): void {
    event.preventDefault()
    this.todosService.changeFilter(filterName)
  }
}
