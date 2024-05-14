import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
    {
        path: '',
        component: TodosComponent
    },
    {
        path: 'ToDos',
        component: TodosComponent
    }
];

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}