import { AppMaterialModule } from './material/app-material/app-material.module';
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaveTodoComponent } from './todo/components/save-todo/save-todo.component';
import { AllTodoComponent } from './todo/components/all-todo/all-todo.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { TodoService } from './todo/services/todo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './todo/components/todo/todo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SubHeaderComponent } from './dashboard/sub-header/sub-header.component';
import * as Hammer from 'hammerjs';
@Injectable({ providedIn: 'root' })
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.2, threshold: 20 ,direction:Hammer.DIRECTION_ALL},
    'pinch':{enable:true},
    'rotate':{enable:true} ,
  }
  options = {
    

  }
}
@NgModule({
  declarations: [
    AppComponent,
    SaveTodoComponent,
    AllTodoComponent,
    HeaderComponent,
    FooterComponent,
    TodoComponent,
    SubHeaderComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HammerModule
  ],
  providers: [
    TodoService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
