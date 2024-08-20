import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any;

  constructor(private service: CartsService) {}

  ngOnInit(): void {
    this.getAllCarts()
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
}
