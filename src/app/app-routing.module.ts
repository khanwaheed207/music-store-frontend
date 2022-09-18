import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:"full"},
  {path:'home' , component:HomeComponent},
  {path:'auth' , loadChildren:  () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  {path:'instruments' , loadChildren:  () => import('./components/products/instruments.module').then(m => m.InstrumentsModule) },
  {path:'admin', loadChildren:  () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  {path:'**' , component:NotfoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
