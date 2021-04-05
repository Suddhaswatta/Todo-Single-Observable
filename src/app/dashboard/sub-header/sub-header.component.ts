import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo/services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveTodoComponent } from 'src/app/todo/components/save-todo/save-todo.component';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  constructor(private todoservice: TodoService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleCreate() {
    console.log("Create ");
    const ref = this.dialog.open(SaveTodoComponent, { data: {} });
  }

  saveAll() {
    console.log('Save All');
  }

  search(event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log('Search Bar ' + filterValue);
    this.todoservice.search(filterValue);
  }


}
