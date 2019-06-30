import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductsService } from './services/products-service.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "./services/user-service.service";
import { LogInComponent } from './log-in/log-in.component';
import { OrderService } from './services/order-service.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { FilterPipe } from './filter.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    SignUpComponent,
    ManageProductsComponent,
    LogInComponent,
    CheckoutComponent,
    FilterPipe,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductsService, UserService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
