import { fadeInOut } from 'src/app/animations';
import { SaveTodoComponent } from './../save-todo/save-todo.component';
import { Todo } from './../../domains/todo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-all-todo',
  templateUrl: './all-todo.component.html',
  styleUrls: ['./all-todo.component.css'],
  animations: [fadeInOut]
})
export class AllTodoComponent implements OnInit, OnDestroy {

  constructor(private todoservice: TodoService, private dialog: MatDialog) { }

  todos$ = this.todoservice.getTodos$();

  backlogs$ = this.todos$.pipe(
    map((todos: Todo[]) => {
      return todos.filter(todo => todo.status == 'backlog')
    })
  );

  wips$ = this.todos$.pipe(
    map((todos: Todo[]) => {
      return todos.filter(todo => todo.status == 'wip')
    })
  );

  dones$ = this.todos$.pipe(
    map((todos: Todo[]) => {
      return todos.filter(todo => todo.status == 'done')
    })
  );

  private subscriptions = new Subscription();

  ngOnInit(): void {
    const loadAllDataSubscription = this.todoservice.loadData$().subscribe();
    this.subscriptions.add(loadAllDataSubscription);
  }
  handleCreate() {
    console.log("Create ");
    const ref = this.dialog.open(SaveTodoComponent);


  }
  saveAll() {
    console.log('Save All');

  }

  ngOnDestroy(): void {
    console.log("Destroyed");

    this.subscriptions.unsubscribe();
  }


}
