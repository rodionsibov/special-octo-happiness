import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  text: string = '';

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {}

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    console.log(target.value);
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = ''
  }
}
