import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products-service.service";
import { Product } from '../product';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormControl  } from "@angular/forms";
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tooltip: NgbTooltip;
  messageActive: boolean = false;
  message: string;
  messageType: string;
  products: Product[];
  quantity: number = 0
  costSum: number = localStorage.getItem("sumCost") ? parseFloat(localStorage.getItem("sumCost")) : 0;
  numberOfItems: number = localStorage.getItem("numOfItems") ? parseFloat(localStorage.getItem("numOfItems")) : 0;
  cart: object[] = [];
  filter = new FormControl('');

  constructor(private productService: ProductsService, private modalService: NgbModal ) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => { //Get all items from database
      this.products = data;
      this.products.forEach(product => { //for each item check if it was already saved in a previous site visit or not and apply the correct value
        localStorage.getItem(`${product["_id"]}`) 
        ? product.totalCost = JSON.parse(localStorage.getItem(`${product["_id"]}`)).totalCost
        : product.totalCost = 0;
        localStorage.getItem(`${product["_id"]}`) 
        ? product.totalAmount = JSON.parse(localStorage.getItem(`${product["_id"]}`)).totalAmount
        : product.totalAmount = 0;
      });
    }, err => {
      console.error(err);
    });
  }

  search() {
    return this.products.filter(product => {
      const searchTerm = this.filter.value.toLowerCase();
      return product.description.toLowerCase().includes(searchTerm);
    })
  }
  
  showProductDetails(id) {
    const productModalReference = this.modalService.open(ProductDetailsComponent);
    productModalReference.componentInstance.id = id;
  }

  clearCart() {
    localStorage.setItem("numOfItems","0");
    localStorage.setItem("sumCost","0");
    this.numberOfItems = 0;
    this.costSum = 0;
    this.cart = [];
    this.showMessage('success', 'Cart cleared!');    
    return this.productService.getProducts().subscribe((data:Product[]) => {
      this.products = data;
      this.products.forEach(product => {
        if(localStorage.getItem(`${product["_id"]}`)) localStorage.removeItem(`${product["_id"]}`);
      });
    });
  }

  actionOnItems(action: string, product, quantity: string) {
    if(quantity == "0") return; //Check for empty entries
    let q = parseFloat(quantity);
    if(product.totalAmount < q && action == 'remove') { //Check for values bigger than totalAmount
      this.showMessage('warning', "Oops! Looks like you tried to remove more items than you've already added!"); //Show correct message to user
      return; 
    }
    else {
      this.initializeEmptyProduct(product); //Check for empty values in totalAmount and totalCost variables inside the product and initialize them if so
      if(action == 'add') {
        this.changeLocalStorageAndUserVisuals(product, q); //Change proper totalCost and totalAmount values for said product, changing the localStorage variables as well
        this.showMessage("success", `${quantity} ${product.description} has been added to your cart!`); //Show correct message to user
      } 
      else if (action == 'remove') {
        this.changeLocalStorageAndUserVisuals(product, -q); //Change proper totalCost and totalAmount values for said product, changing the localStorage variables as well
        this.showMessage('success', `${quantity} ${product.description} has been deleted from your cart!`); //Show correct message to user
      }
    }
  }
  sendToCart() {
    this.products.forEach(product => {
      if(product.totalAmount != 0 || product.totalCost != 0) {
        this.cart.push(product);
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  showMessage(messageType: string, message: string) {
    this.messageType = messageType;
    this.messageActive = true;
    this.message = message;
    if(messageType != 'warning') {
      setTimeout(() => { //Wait 2.5 seconds before vanishing the user alert
        this.messageActive = false;
        this.message = '';
      }, 2500);
    }
  }

  initializeEmptyProduct(product) {
    if(product.totalAmount == undefined || product.totalCost == undefined) {
      product.totalAmount = 0;
      product.totalCost = 0;
    }
  }

  changeLocalStorageAndUserVisuals(product, quantity: number) {
    this.costSum += (quantity * product.cost); //Sum of ALL items cost
    this.numberOfItems += quantity; //Sum of ALL number of items
    product.totalAmount += quantity; //Changing visual amount of the product
    product.totalCost = (product.totalAmount * product.cost) //Changing visual cost of the product
    localStorage.setItem('sumCost', this.costSum.toString());
    localStorage.setItem('numOfItems', this.numberOfItems.toString());
    localStorage.setItem(`${product._id}`, JSON.stringify({totalAmount: product.totalAmount, totalCost: product.totalCost}));
  }

  openModal() {

  }
}
