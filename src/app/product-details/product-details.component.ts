import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products-service.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() public id: string;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private productsService: ProductsService) { }
  similarProducts: Product[];
  product: Product;

  ngOnInit() {
    this.productsService.getProductById(this.id).subscribe((product: Product) => {
      this.product = product;
      this.productsService.getProducts().subscribe((products: Product[]) => {
        let descriptionSubStrings: string[] = product.description.toLowerCase().split(' ');
        this.similarProducts = products.filter((p:Product) => {
          return (p["_id"] != product["_id"]  && descriptionSubStrings.filter(e => {return p.description.toLowerCase().includes(e)}).length > 0);
        });
        if (this.similarProducts.length > 5) this.similarProducts.length = 5;
      });
    }),
    err => {
      console.error(err);
    }
  }
  closeModal() {
    this.activeModal.close("success");
  }

}
