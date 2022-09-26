import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private instrumentUrl: string = `${environment.apiUrl}/top/instruments`;
  private apiUrl: string = `${environment.apiUrl}/instruments`;

  public whishlistProducts: any[] = [];
  public cartProducts: any[] = [];
  public products: any[] = [];

  public productsSub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public productsRetreived: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getProducts(title?: string) {
    let url = title ? `${this.apiUrl}?title=${title}` : this.apiUrl;
    this.httpClient.get(url).subscribe(
      (res) => {
        this.productsSub.next(Object.assign([], res))
        this.productsRetreived = true
      }
    );
  }

  // Add product
  addProducts(data: any) {
    return this.httpClient.post(this.apiUrl, data);
  }

  // update product
  updateProducts(data: any) {
    return this.httpClient.put(`${this.apiUrl}/${data.id}`, data);
  }

  // Delete product
  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  /* postData(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/post`, data)
} */


  // for admin
  getAllProducts(): any {
    return this.httpClient.get<any[]>(this.apiUrl);
  }

  // add products to cart
  addProductToShoppingCart(prd: any, prdRemoveBool?: boolean, prdIdx = -1) {
    // add product into cart for multiple time.
    if (this.cartProducts.some(x => x["id"] === prd["id"])) {
      let idx = this.cartProducts.findIndex(x => x["id"] === prd["id"]);
      this.cartProducts[idx]["quantity"] += 1;
      console.log(prd['title'], "Alreay Added to Cart, Quantity Updated");
    } else {
      this.cartProducts.push({
        ...prd,
        "quantity": 1
      });
      console.log(prd['title'], "Product Added to Shoping Cart");
    }
  }

  // add product to whishlist
  addProductToWhishlist(prd: any, prdRemoveBool?: boolean, prdIdx: number = -1) {
    if (!this.whishlistProducts.some(x => x["id"] === prd["id"])) {
      this.whishlistProducts.push({
        ...prd, "quantity": 1
      });
      console.log(prd['title'], "Product Added to Whishlist");
    } else {
      console.log(prd['title'], "Already Added to Whishlist");
    }
    if (prdRemoveBool) {
      this.products.splice(prdIdx, 1);
    }
  }

}
