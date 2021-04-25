import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from './../@shared/shared.module';
import { CartPopupComponent } from './products/cart-popup/cart-popup.component';
import { AppLayoutRoutingModule } from '../app-layout/app-layout-routing.module';

@NgModule({
  declarations: [ProductsComponent, CartComponent, CheckoutComponent, CartPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppLayoutRoutingModule
  ]
})
export class ProductsModule { }
