import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public prodObservable: Observable<any[]> = new Observable();
  public categoryObservable: Observable<any[]> = new Observable();

  constructor(private productService: ProductsService,
    private fb: FormBuilder, private modalService: NgbModal) { }

  productForm: FormGroup = new FormGroup({});
  productModel: Products | undefined;

  selectedImageIdx: number = 0;
  thumbnailImageIdx: number = 0;

  tempImageFiles: any[] = [];

  updation: boolean = false;
  loader: boolean = false;

  ngOnInit(): void {
    this.prodObservable = this.productService.getAllProducts();
    // this.categoryObservable = this.categoriesService.getCategories();
  }

  addProduct() {
    this.productService.addProducts(this.productForm.value).subscribe(res => {
      this.modalService.dismissAll();
    });
  }

  updateProduct() {
    this.productService.updateProducts(this.productForm.value).subscribe(res => {
      this.modalService.dismissAll();
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productForm.value).subscribe(res => {
      this.modalService.dismissAll();
    });
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
        active: [true],
        image_url: [],
      });
    } else {
      this.updation = true;
      this.productForm = this.fb.group({
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
      this.tempImageFiles = productObj.image_url || [];
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
  title?: number;
  description?: string;
  referance_code?: string;
  rating?: number;
  price?: number;
  artist?: string;
  image_url?: string[];
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
  active?: boolean;
}