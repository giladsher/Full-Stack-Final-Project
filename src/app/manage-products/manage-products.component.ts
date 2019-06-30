import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products-service.service';
import { Product } from '../product';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  
  pictures;
  products: Product[];
  costRegExp = /[0-9]/;
  formGroup: FormGroup = this.formBuilder.group({
    picture: [''],
    description: ['', [Validators.required]],
    cost: ['', [Validators.required, Validators.pattern(this.costRegExp)]]
  });
  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private httpService: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    if(!localStorage.getItem('admin')) window.location.assign('/home');
    this.httpService.get('./assets/pictures.json').subscribe(data => this.pictures = data, err => console.error(err));
    this.getProducts();
  }
  selectImage(image) {
    document.querySelector('#selectedImage')["src"] = image.path;
    document.querySelector('#txtPicture')["value"] = image.path;
  }
  
  openModal(content) {
    this.modalService.open(content);
  }
  
  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    }, err => {
      console.error(err);
    });
  }
  addProduct(picture: string, description: string, cost: any) {
    let product: Product = {
      picture: picture,
      description: description,
      cost: cost,
      totalAmount: 0,
      totalCost: 0
    };
    this.productService.addProducts(product).subscribe(data => {
      this.getProducts();
    }, err => {
      console.error(err);
    });
  }
  deleteProduct(id:string) {
    this.productService.deleteProduct(id).subscribe(data => {
      this.getProducts();
    }, err => {
      console.error(err);
    });
  }
}