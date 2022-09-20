import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  fetching: boolean = false;
  products:any[]= [];
  cartProducts: any[] = [];
  whishlistProducts: any[] = [];

  searchInput:string ="";
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
  }

  addProductToShoppingCart(product:any) {
    this.productSrv.addProductToShoppingCart(product);
  }

  search() {
    console.log(this.searchInput);    
    if(this.searchInput.length >0) {
      this.productSrv.getProducts(this.searchInput);
    }else {
      this.productSrv.getProducts();
    }
  }
}
