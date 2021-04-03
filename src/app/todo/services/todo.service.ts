import { Todo } from './../domains/todo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer, Subject } from 'rxjs';
import { tap, concatMap, flatMap, delayWhen, delay } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos$ = new BehaviorSubject([]);
  private todos: Todo[] = [];
  private mockupData: Todo[] =
    [
      new Todo('1', 'Brush', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),
      new Todo('2', 'Shower', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),
      new Todo('3', 'Tea', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "done"),
      new Todo('4', 'Breakfast', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "wip"),
      new Todo('5', 'Lunch', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "done"),
      new Todo('6', 'Dinner', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "done"),
      new Todo('7', 'Sleep', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),
      new Todo('8', 'Wake up', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),
      new Todo('9', 'Run ', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "wip"),
      new Todo('10', 'Work', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "wip"),
      new Todo('12', 'Go to Gym', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),
      new Todo('11', 'Go', new Date('2012-04-23T18:25:43.511Z'), new Date('2012-04-23T18:25:43.511Z'), "backlog"),

    ];



  constructor() { }

  delete(todo: Todo) {

    const index = this.findById(todo.id);
    this.todos.splice(index, 1);
    this.setTodos$()

  }



  private fetchData() {
    const http = {
      get: (url) => of(this.mockupData)
    }

    return http.get('MyUrl')
      .pipe(
        tap(data => {
          // console.log(data);

        })
      )


  }

  public loadData$() {

    return this.fetchData().pipe(

      flatMap(x => x),
      concatMap(x=>of(x).pipe(delay(500))),
      // concatMap((x, i) => of(x).pipe(
      //   delayWhen((x) => {
      //     return i % 3 === 0 ? timer(500) : timer(0)
      //   })
      // )),

      tap(x => {
        this.todos.push(x);
        this.setTodos$();
      })


    )
  }
  setTodos$() {
    this.todos$.next(this.todos);
  }

  public getTodos$() {
    return this.todos$.asObservable();
  }

  createTodo(todo: Todo) {

    const id: string = uuid();
    todo.id = id;

    this.todos.push(todo);

  }

  findById(id: string) {
    return this.todos.findIndex(todo => todo.id === id);
  }

  save(todo: Todo) {

    const index = this.todos.findIndex(previous => previous.id == todo.id);
    if (index !== -1)
      this.todos[index] = todo;
    else
      this.createTodo(todo);

    this.setTodos$();

  }





}





