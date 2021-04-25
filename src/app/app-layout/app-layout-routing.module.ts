import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../@core/auth/guards/auth.guards';
import { CartComponent } from '../products/cart/cart.component';
import { CheckoutComponent } from '../products/checkout/checkout.component';
import { ProductsComponent } from '../products/products/products.component';
import { AppLayoutComponent } from './app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full', },
      { 
        path: 'products', 
        component: ProductsComponent ,
      },
      {
          path: 'checkout',
          component: CheckoutComponent,
      },
      {
          path: 'cart',
          component: CartComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
