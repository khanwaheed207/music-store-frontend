import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormArray, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptorService } from './services/auth-token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    NotfoundComponent,    
    OrdersComponent
  ],
  imports: [
    BrowserModule,RouterModule,FormsModule,
    AppRoutingModule, FormsModule, HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
