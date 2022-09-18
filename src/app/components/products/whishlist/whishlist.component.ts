import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  constructor(public db:ProductsService) { }

  ngOnInit(): void {
  }

  removeProductFromWhishlist(prdIdx:number) {
    let elements = this.db.whishlistProducts.splice(prdIdx, 1);
    console.log(elements[0]['title'], "Product Removed from Whishlist");
  }

  addProductToShoppingCart(prd:any, removeBool:boolean, prdIdx:number) {
    this.db.addProductToShoppingCart(prd, removeBool, prdIdx);
    this.removeProductFromWhishlist(prdIdx);
  }
}
