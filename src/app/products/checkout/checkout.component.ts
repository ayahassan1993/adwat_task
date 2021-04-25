import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/@core/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userID = JSON.parse(localStorage.getItem('currentUser')).key[0];
  user = JSON.parse(localStorage.getItem('currentUser')).data[0];
  address = this.user.address;
  show=false;
  cart = [];
  totalPrice = 0;
  afterDiscount = 0;
  constructor(private db: ProductsService) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.db.getCartItems(this.userID).subscribe(
      res => {
        this.cart = res;
        this.totalPrice = 0;
        if (res) {
          this.cart = res;
          this.cart.map(item => this.totalPrice += (item.quantity * item.price));
          if (this.user.membership == 'platinum')
            this.afterDiscount = this.totalPrice - (this.totalPrice * 10 / 100);
          else if (this.user.membership == 'gold')
            this.afterDiscount = this.totalPrice - (this.totalPrice * 15 / 100);
        }
      }
    )
  }

}
