import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppLayoutRoutingModule } from './app-layout-routing.module';



@NgModule({
  declarations: [AppLayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    AppLayoutRoutingModule,
  ]
})
export class AppLayoutModule { }
