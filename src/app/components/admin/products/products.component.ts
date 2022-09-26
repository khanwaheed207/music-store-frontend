import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prodObservable = new Observable<any[]>();
  productList: any = [];

  productForm: FormGroup = new FormGroup({});
  productModel: Products | undefined;

  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;

  tempImageFiles: any[] = [];

  updation: boolean = false;
  loader: boolean = false;

  constructor(private productService: ProductsService,
    private fb: FormBuilder, private modalService: NgbModal, private router: Router) {
    this.createProductForm();
  }

  // Create reactive form for registration
  createProductForm() {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      referance_code: [''],
      rating: [''],
      price: [''],
      artist: [''],
      artwork: [''],
      image_url: ['']
    });
  };

  ngOnInit(): void {
    this.getProductList();
    this.prodObservable = this.productService.getAllProducts();
    // this.categoryObservable = this.categoriesService.getCategories();
  }

  public getProductList() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.productList = data;
    })
  }

  onSubmit() {
    if (this.productForm.get('id')?.value != null) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.addProducts(this.productForm.value).subscribe(res => {
        console.log("Product added successfull!");
        this.modalService.dismissAll();
        this.getProductList();
      }, err => {
        console.log(err);
        console.log("Failed to add product, Please try again!");
      });
    } else {
      this.validateForm(this.productForm);
      console.log("Form is not valid!");
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      this.productService.updateProducts(this.productForm.getRawValue()).subscribe((res: any) => {
        console.log("Product updated successfullty");
        this.modalService.dismissAll();
        this.getProductList();
      }, (err: any) => {
        console.log();
        console.log("Failed to update user, Please tru again!");
      });
    } else {
      this.validateForm(this.productForm);
      console.log("Form is nor valid!");
    }
  }

  deleteProduct(id: number): void {
    if (this.productForm.valid) {
      this.productService.deleteProduct(id).subscribe((data: any) => {
        console.log("Product deleted successfullty");
        this.modalService.dismissAll();
        this.getProductList();
      }, (err: any) => {
        console.log(err);
        console.log("Product deletion failed!");
      });
    }
  }

  openModal(modal: any, prd: Products | null = null) {
    this.tempImageFiles = [];
    this.initialiseModal(prd);
    this.modalService.open(modal, { size: "xl" });
  }

  openImageModal(modal: any, imageUrls: string[], thumbnailImageIdx: number) {
    this.tempImageFiles = [...imageUrls];
    this.thumbnailImageIdx = thumbnailImageIdx;
    this.modalService.open(modal, {
      size: "xl",
      scrollable: true
    });
  }

  openImage(url: string) {
    window.open(url, "_blank")
  }

  viewProductDetails(modal: any, productObj: Products) {
    this.productModel = productObj;
    this.modalService.open(modal, { size: 'lg' });
  }

  public validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else {
        this.validateForm(form);
      }
    })
  }

  hasError(name: string) {
    const field = this.productForm.get(name);
    return (field?.invalid && field?.touched && field?.errors);
  }

  // Product getter
  get form() {
    return this.productForm.controls;
  }

  get title() {
    return this.form['title'];
  }

  get description() {
    return this.form['description'];
  }

  get referance_code() {
    return this.form['referance_code'];
  }

  get rating() {
    return this.form['rating'];
  }

  get price() {
    return this.form['price'];
  }

  get artist() {
    return this.form['artist'];
  }

  get artwork() {
    return this.form['artwork'];
  }

  get image_url() {
    return this.form['image_url'];
  }


  initialiseModal(productObj: Products | null) {
    if (productObj == null) {
      this.updation = false;
      this.productForm = this.fb.group({
        title: [],
        description: [null],
        referance_code: [null],
        rating: [null],
        price: [null],
        artist: [null],
        artwork: [null],
        image_url: [],

      });
    } else {
      this.updation = true;
      this.productForm = this.fb.group({
        id: [productObj.id],
        title: [productObj.title],
        description: [productObj.description],
        referance_code: [productObj.referance_code],
        rating: [productObj.rating],
        price: [productObj.price],
        artist: [productObj.artist],
        artwork: [productObj.artwork],
        image_url: [productObj.image_url],
      });
      // this.onSelectOption(productObj.productCategory);
      // this.tempImageFiles = productObj.image_url || [];
    }
  }

  onSelectOption(category: Category | Event | undefined) {
    // this.productForm.patchValue({
    //   category: this.categories.find(x => x.categoryId === category.categoryId)
    // })
  }

  checkImageFileType(event: any) {
    let fileList: File[] = Object.assign([], event.target.files);
    fileList.forEach((file: any, idx: number) => {
      if (
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/jpg"
      ) {
        this.tempImageFiles.push(file);
      } else {
        // this.toast.warning("Only .png/.jpeg/.jpg file format accepted!!", file.name + " will not accepted.");
      }
    });
  }


  removeImage(idx: number) {
    this.tempImageFiles.splice(idx, 1);
  }

  changeThumbnailImageIdx(idx: number) {
    this.productForm.patchValue({
      thumbnailImage: idx
    })
  }

  compareByCategoryId(category1: Category, category2: Category) {
    return category1 && category2 && category1.categoryId === category2.categoryId;
  }

}


export interface Products {
  id?: number;
  title?: number;
  description?: string;
  referance_code?: string;
  rating?: number;
  price?: number;
  artist?: string;
  image_url?: string;
  artwork?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  categoryId?: string;
  categoryName?: string;
  categoryDescription?: string;
  categoryImageUrl?: string;
  createdOn?: Date;
}