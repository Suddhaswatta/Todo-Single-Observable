import { SaveTodoComponent } from './../save-todo/save-todo.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../domains/todo';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { fade } from 'src/app/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    fade,
  ]

})
export class TodoComponent implements OnInit {
  constructor(
    private todoservice: TodoService,
    private _snackBar: MatSnackBar,
    private matdialog: MatDialog) { }

  @Input()
  public todo: Todo;
  visible = true;
  private subscriptions = new Subscription();
  panelOpenState
  ngOnInit(): void {
  }

  method() {
    console.log('Touched');
  }
  swipeLeft(todo: Todo, $event) {

    if (todo.status == 'backlog') {
      this.deleteTodo()
    } else if (todo.status == 'wip') {
      this.todo.status = "backlog";
      this.todoservice.save(this.todo);

    } else if (todo.status == 'done') {
      this.todo.status = "wip";
      this.todoservice.save(this.todo);

    }

  }

  swipeRight(todo: Todo, $event) {

    if (todo.status == 'backlog') {
      this.todo.status = "wip";
    } else if (todo.status == 'wip') {
      this.todo.status = "done";
    } else if (todo.status == 'done') {
      return;
    }

    this.todoservice.save(this.todo);
  }

  deleteTodo() {

    this.todoservice.delete(this.todo);



  }
  edit() {
    console.log("Double Click ");
    this.matdialog.open(SaveTodoComponent, { data: this.todo })

  }

}
