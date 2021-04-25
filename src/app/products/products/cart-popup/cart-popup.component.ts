import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/@core/services/products.service';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent implements OnInit {
  userID = JSON.parse(localStorage.getItem('currentUser')).key[0];
  userType = JSON.parse(localStorage.getItem('currentUser')).data[0].membership;
  product : any = {};
  cart = [];
  productID;
  totalPrice = 0;
  afterDiscount = 0;
  productValue = 0;
  constructor(private db: ProductsService,public dialogRef: MatDialogRef<CartPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.getCart();
    }

  ngOnInit(): void {
    this.productID = this.data.productID;
    this.getProduct()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getProduct(){
    this.db.getProduct(this.productID).subscribe(
      res=>{
        this.product = res;
      }
    )
  }

  addToCart(){
    let newProduct = {
      ...this.product,
      quantity:this.product.quantity - 1
    }
    this.db.updateProductQuantiy(this.productID,newProduct);
    let data ={
      id:this.productID,
      quantity : this.productValue  + 1,
      price : this.product.price,
      name : this.product.name,
      image : this.product.image
    }
    this.db.addToCart(this.userID,this.productID,data);
  }

  removeFromCart(){
    let newProduct = {
      ...this.product,
      quantity:this.product.quantity + 1
    }
    this.db.updateProductQuantiy(this.productID,newProduct);
      let data ={
        id:this.productID,
        quantity : this.productValue - 1,
        price : this.product.price,
        name : this.product.name,
        image : this.product.image
      }
      this.db.addToCart(this.userID,this.productID,data);

  }


  getCart(){
    this.db.getCartItems(this.userID).subscribe(
      res => {
        this.cart = res;
        this.totalPrice = 0;
        if(res){
          this.cart = res;
          let item = this.cart.find(x => x.id == this.productID);
          if(item)
            this.productValue = item.quantity;
            if(this.productValue == 0)
              this.db.removeItemFromCart(this.userID,this.productID)
            this.cart.map(item => this.totalPrice+=(item.quantity*item.price));
            if(this.userType == 'platinum')
              this.afterDiscount = this.totalPrice - (this.totalPrice*10/100);
            else if(this.userType == 'gold')
              this.afterDiscount = this.totalPrice - (this.totalPrice*15/100);
        }
      }
    )
  }

}
