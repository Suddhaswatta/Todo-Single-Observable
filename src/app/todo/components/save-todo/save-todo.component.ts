import { Todo } from './../../domains/todo';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-save-todo',
  templateUrl: './save-todo.component.html',
  styleUrls: ['./save-todo.component.css']
})
export class SaveTodoComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Todo) { }

  ngOnInit(): void {
  }

}
