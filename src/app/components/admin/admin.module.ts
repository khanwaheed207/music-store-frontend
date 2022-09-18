import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:"full"},
  {path:'products' , component:ProductsComponent},
  {path:'users' , component:UsersComponent},
];

@NgModule({
  declarations: [
    ProductsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes), ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AdminModule { }
