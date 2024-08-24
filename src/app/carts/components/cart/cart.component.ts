import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any;
  form!: FormGroup;
  products: any[] = [];
  details: any;
  total = 0;

  constructor(private service: CartsService, 
    private build: FormBuilder,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }

  getAllCarts() {
    this.service.getAllCarts().subscribe(
      (response: any) => {
        console.log(response);
        this.carts = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter() {
    let date = this.form.value;
    this.service.getAllCarts(date).subscribe(
      (response: any) => {
        console.log(response);
        this.carts = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe((res) => {
      this.getAllCarts();
      alert('Cart deleted Success');
    });
  }

  view(index:number) {
    this.products = []
    this.details = this.carts[index];
    for(let x in this.details.products) {
      this.productService.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({item: res , quantity:this.details.products[x].quantity})
      })
    }
    console.log(this.details)
  } 
}