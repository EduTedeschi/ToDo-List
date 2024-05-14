import { Component, NgModule, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToDo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit{
  todos: ToDo[] = [];
  newTodo: ToDo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date()
  }

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAll()
      .subscribe({
        next: (todos) => {
          this.todos = todos;
        }
      });
  }

  addToDo(){
    this.todoService.addToDo(this.newTodo).subscribe({
      next: (todo) => {
        this.getAllTodos();
      }
    });
  }

  onCompleted(id: string, todo: ToDo){
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateToDo(id, todo).subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    });
  }

  deleteToDo(id: string){
    this.todoService.deleteToDo(id).subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    });
  }
}
