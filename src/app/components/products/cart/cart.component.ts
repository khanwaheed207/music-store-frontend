import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public totalItems: number = 0;
  public totalPrice: number = 0;

  constructor(public db: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.calculate();
  }

  addPrdToWishlist(prd:any, removeBool:boolean, prdIdx:number) {
    this.db.addProductToWhishlist(prd, removeBool, prdIdx);
    this.removeProductFromCart(prdIdx);
    this.calculate();
  }

  removeProductFromCart(prdIdx:number){
    let elements = this.db.cartProducts.splice(prdIdx, 1);
    console.log(elements[0]['title'], "Product Removed from Cart");
    this.calculate();
  }
  calculate() {
    this.totalItems = this.db.cartProducts.reduce((prev, next)=> prev + next['quantity'], 0);
    this.totalPrice  = this.db.cartProducts.reduce((prev, next)=> prev + (next['price'] * next['quantity']),0);
  }

  goTo(url:any){
    this.router.navigateByUrl(url);
  }
}
