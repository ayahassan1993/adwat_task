import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/@core/services/products.service';
import {MatDialog} from '@angular/material/dialog';
import { CartPopupComponent } from './cart-popup/cart-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories = [];
  products = [];
  filterdProducts = [];
  userID = JSON.parse(localStorage.getItem('currentUser')).key[0];
  constructor(private db: ProductsService,public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.db.getCategories().subscribe(
      res => {
        this.categories = res;
      }
    )
  }

  getProducts() {
    this.db.getProducts().subscribe(
      res => {
        if (res) {
          this.products = this.filterdProducts = res;
        }
        else
          this.products = this.filterdProducts = [];
      }
    )
  }

  getCategoryName(id) {
    let cat = this.categories.find(x => x.id == id);
    return cat.name;
  }

  filter(event) {
    let selected_cat = event.target.value;
    if (selected_cat)
      this.filterdProducts = this.products.filter(product => product.category_id == selected_cat);
    else
      this.filterdProducts = this.products
  }

  addToCart(product){
    this.dialog.open(CartPopupComponent, {
      width: '400px',
      data: {
        productID:product.id,
      }
    });
  }

}
