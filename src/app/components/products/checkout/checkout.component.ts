import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cardImages: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png",
    "https://trak.in/wp-content/uploads/2020/01/Rupay-Cards-Big-1.jpg"
  ];
  totalPrice: number = 0;

  constructor(
    public db: ProductsService
  ) { }

  ngOnInit(): void {
    this.totalPrice = this.db.cartProducts.reduce((prev, next) => prev + (next['price'] * next['quantity']), 0);
  }

}
