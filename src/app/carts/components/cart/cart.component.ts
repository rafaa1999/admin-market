import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any;
  form!: FormGroup;

  constructor(private service: CartsService, private build: FormBuilder) {}

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
}
