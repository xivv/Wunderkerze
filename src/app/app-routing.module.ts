import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from './products/view/product-view/product-view.component';
import { AdministrationComponent } from './products/administration/administration.component';
import { ProductCreationComponent } from './products/administration/product-creation/product-creation.component';
import { ProductManagementComponent } from './products/administration/product-management/product-management.component';
import { ProductComponent } from './products/view/product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCartComponent } from './products/shopping-cart/shopping-cart.component';
import { OrderComponent } from './products/order/order.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddressComponent } from './user/address/address.component';
import { AuthguardService } from './auth/services/authguard.service';
import { RoleguardService } from './auth/services/roleguard.service';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './products/payment/payment.component';
import { OrderAdministrationComponent } from './products/order/order-administration/order-administration.component';
import { PayedComponent } from './products/payment/payed/payed.component';


const routes: Routes = [
  { path: 'products', component: ProductViewComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products/administration', component: AdministrationComponent, canActivate: [AuthguardService, RoleguardService] },
  { path: 'product/administration/creation', component: ProductCreationComponent, canActivate: [AuthguardService, RoleguardService] },
  { path: 'product/administration/management', component: ProductManagementComponent, canActivate: [AuthguardService, RoleguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthguardService] },
  { path: 'orders/administration/management', component: OrderAdministrationComponent, canActivate: [AuthguardService, RoleguardService] },
  { path: 'payed', component: PayedComponent, canActivate: [AuthguardService] },
  { path: 'user', component: ProfileComponent, canActivate: [AuthguardService] },
  { path: 'user/address/:mode', component: AddressComponent, canActivate: [AuthguardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
