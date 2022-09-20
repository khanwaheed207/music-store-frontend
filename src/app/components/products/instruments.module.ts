import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { ViewComponent } from './view/view.component';
import { InstrumentsComponent } from './instruments.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { SummaryPipe } from 'src/app/pipes/summary.pipe';


const routes: Routes = [
  { path :'', component: InstrumentsComponent },
    { path :'shopping-cart', component: CartComponent },
    { path :'checkout', component: CheckoutComponent },
    { path :'view', component: ViewComponent },
    { path :'whishlist', component: WhishlistComponent },
];



@NgModule({
  declarations: [
    InstrumentsComponent,
    ViewComponent,
    WhishlistComponent,
    CartComponent,
    CheckoutComponent,
    SummaryPipe
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),ReactiveFormsModule,FormsModule
  ],
  exports: [RouterModule],
  providers: [ProductsService]
})
export class InstrumentsModule { }
