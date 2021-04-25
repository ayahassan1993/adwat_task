import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationGuard } from './@core/auth/guards/auth.guards';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { SessionGuard } from './@core/auth/guards/session.guard';
import { ProductsModule } from './products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
  ],
  providers: [AuthenticationGuard,SessionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
