import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';
  public form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.required
      ])]
    })
    this.loadFromLocalStorage();
    // this.todos.push(new Todo(1, 'Passear com cachorro', false));
    // this.todos.push(new Todo(2, 'Cortar o cabelo', true));
    // this.todos.push(new Todo(3, 'Ir ao mercado', false));
  }

  removeTask(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    }
    this.saveAtLocalStorage();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.saveAtLocalStorage();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.saveAtLocalStorage();
  }

  create() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.saveAtLocalStorage();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  saveAtLocalStorage() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    if(data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }
}
