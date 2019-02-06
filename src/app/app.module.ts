import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/services/auth.service';
import { AuthguardService } from './auth/services/authguard.service';
import { ProductViewComponent } from './products/view/product-view/product-view.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AdministrationComponent } from './products/administration/administration.component';
import { ProductCreationComponent } from './products/administration/product-creation/product-creation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductManagementComponent } from './products/administration/product-management/product-management.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { ProductComponent } from './products/view/product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCartComponent } from './products/shopping-cart/shopping-cart.component';
import { OrderComponent } from './products/order/order.component';
import { AddressComponent } from './user/address/address.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AlertComponent } from './messages/alert/alert.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './products/payment/payment.component';
import { OrderAdministrationComponent } from './products/order/order-administration/order-administration.component';
import { SearchComponent } from './products/search/search.component';
import { PayedComponent } from './products/payment/payed/payed.component';
import { OrderModule } from 'ngx-order-pipe';
import { ContactComponent } from './user/contact/contact.component';
import { ContactManagementComponent } from './products/administration/contact-management/contact-management.component';
import { ContactListingComponent } from './user/contact/contact-listing/contact-listing.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { OrderAdministrationOverviewComponent } from './products/order/order-administration-overview/order-administration-overview.component';
import { AgbComponent } from './user/agb/agb.component';
import { PaymentinformationComponent } from './user/paymentinformation/paymentinformation.component';
import { ImpressumComponent } from './user/impressum/impressum.component';
import { MerchandiseViewComponent } from './merchandise/view/merchandise-view/merchandise-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FaqComponent } from './user/faq/faq.component';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
    AdministrationComponent,
    ProductCreationComponent,
    NavbarComponent,
    ProductManagementComponent,
    ProductComponent,
    LoginComponent,
    ShoppingCartComponent,
    OrderComponent,
    AddressComponent,
    ProfileComponent,
    AlertComponent,
    RegisterComponent,
    PaymentComponent,
    OrderAdministrationComponent,
    SearchComponent,
    PayedComponent,
    ContactComponent,
    ContactManagementComponent,
    ContactListingComponent,
    ResetpasswordComponent,
    OrderAdministrationOverviewComponent,
    AgbComponent,
    PaymentinformationComponent,
    ImpressumComponent,
    MerchandiseViewComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    NgxHmCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    OrderModule,
    PdfViewerModule,
    SlideshowModule
  ],
  providers: [AuthService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
