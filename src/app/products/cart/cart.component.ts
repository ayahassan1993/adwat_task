import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/@core/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userID = JSON.parse(localStorage.getItem('currentUser')).key[0];
  userType = JSON.parse(localStorage.getItem('currentUser')).data[0].membership;
  cart = [];
  totalPrice = 0;
  afterDiscount = 0;
  constructor(private db: ProductsService,) { }

  ngOnInit(): void {
    this.getCart();
  }


  getCart() {
    this.db.getCartItems(this.userID).subscribe(
      res => {
        this.cart = res;
        this.totalPrice = 0;
        if (res) {
          this.cart = res;
          this.cart.map(item => this.totalPrice += (item.quantity * item.price));
          if (this.userType == 'platinum')
            this.afterDiscount = this.totalPrice - (this.totalPrice * 10 / 100);
          else if (this.userType == 'gold')
            this.afterDiscount = this.totalPrice - (this.totalPrice * 15 / 100);
        }
      }
    )
  }

}
