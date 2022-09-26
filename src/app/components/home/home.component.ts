import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fetching: boolean = false;
  products:any[]= [];
  cartProducts: any[] = [];
  whishlistProducts: any[] = [];

  defaultImage ="https://yamaha.ndcdn.in/media/catalog/product/cache/c595231eba0af04c4680df82100c4706/f/s/fsx80c_nt_a_0001.jpg";


  constructor(private productSrv:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productSrv.getProducts();
    this.productSrv.productsSub.subscribe(res=>{
      if(res.length !==0 ) {
        this.products = Object.assign([], res);
        this.fetching = false;
        console.log(this.products);
      }
    })
  }

  addProductToWhishlist(product:any) {
    this.productSrv.addProductToWhishlist(product);
  console.log(product);
  
  }

  addProductToShoppingCart(product:any) {
    this.productSrv.addProductToShoppingCart(product);
  }
}
